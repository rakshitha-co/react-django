from django.shortcuts import render

from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login, logout
from rest_framework import status

from django.utils import timezone
from .models import Post, Comment
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth.models import AnonymousUser
from rest_framework import generics, permissions
@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    email = request.data.get('email')
    if password == password2:
        serializer=SignupSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()   
            group = Group.objects.get(name='customer')
            user.groups.add(group)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)


# login the user
@api_view(['POST'])
def login_view(request):
    # Use DRF's request.data to access POST data
    username = request.data.get('username')
    password = request.data.get('password')
    user = get_object_or_404(User, username=username)
    if not user.check_password(password):
        return Response("Invalid credentials", status=status.HTTP_404_NOT_FOUND)
    
    # Use DRF's Response to handle the response
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

#logout the user
@api_view(['POST'])
def logout_view(request):
    user = request.user
    logout(request)
    return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_list(request):
    if request.method == 'GET':
        data=User.objects.all()
        serializer = UserDetailSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def current_user_detail(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


#display the post in the home page
@api_view(['GET'])
def post_list(request):
    if request.method == 'GET':
        data= Post.objects.filter(published_date__isnull=False)
        serializer = PostSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

# add new post to the blog need users to be logedin   
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#display the post in draft that are yet to be published
@api_view(['GET'])
def draft_post(request):
    if request.method == 'GET':
        data = Post.objects.filter(published_date__isnull=True).order_by('created_date')
        serializer = PostSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

#display the detail of single post as per pk passed
@api_view(['GET'])
def post_detail(request, pk):
    if request.method == 'GET':
        data=Post.objects.get(pk=pk)
        serializer = PostSerializer(data, context={'request': request})
        return Response(serializer.data)

#add the post in draft to the home page by publishing it it requires user to be loged in
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def publish(request, pk):
    post=Post.objects.get(pk=pk)
    if request.method == 'PUT':
        serializer=PostSerializer(post, data=request.data)
        if serializer.is_valid():
            data=serializer.save()
            data.published_date=timezone.now()
            data.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete the post frome the database login is requied for it
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    post=Post.objects.get(pk=pk)
    if request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# display the comments that are posed to the perticular post based on pk mentioned
@api_view(['GET'])
def comment_list(request, pk):
    if request.method == 'GET':
        data=Comment.objects.filter(post=pk)
        serializer=CommentSerializer(data, many=True)
        return Response(serializer.data)
    
# adding new comment to the post require the user to login        
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_add(request, pk):
    if request.method == 'POST':
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#to geting the detail of the commend but it don't have the front end use used only to get commentId foe put and delete api to work
@api_view(['GET'])
def comment_detail(request, pk, comment_id):
    if request.method == 'GET':
        data=Comment.objects.get(id=comment_id)
        serializer = CommentSerializer(data, context={'request': request})
        return Response(serializer.data)

# approve the comment require the login 
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def approve_comment(request, pk, comment_id):
    comment= Comment.objects.get(id=comment_id)
    if request.method == 'PUT':
        serializer=CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            data=serializer.save()
            data.approved_comment=True
            data.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#deleting the comment from database require login
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, pk, comment_id):
    comment= Comment.objects.get(id=comment_id)
    if request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


