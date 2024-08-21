from django.contrib import admin
from django.urls import path, re_path
from blog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/post/$', views.post_list),
    re_path(r'^api/post/add/$', views.add_post),
    re_path(r'^api/post/draft$', views.draft_post),
    re_path(r'^api/post/(?P<pk>\d+)$', views.post_detail),
    
    re_path(r'^api/post/(?P<pk>\d+)/pub$', views.publish),
    re_path(r'^api/post/(?P<pk>\d+)/del$', views.delete_post),
    re_path(r'^api/post/(?P<pk>\d+)/comment/$', views.comment_list),
    re_path(r'^api/post/(?P<pk>\d+)/comment/add$', views.comment_add),
    re_path(r'^api/post/(?P<pk>\d+)/comment/(?P<comment_id>\d+)$', views.comment_detail),
    re_path(r'^api/post/(?P<pk>\d+)/comment/(?P<comment_id>\d+)/app$', views.approve_comment),
    re_path(r'^api/post/(?P<pk>\d+)/comment/(?P<comment_id>\d+)/del$', views.delete_comment),
    re_path(r'^api/login$', views.login_view, name='api_login'),
    re_path(r'^api/logout$', views.logout_view, name='api_logout'),
    re_path(r'^api/signup$', views.signup_view),
    #re_path(r'^api/user/(?P<uid>\d+)$', views.user_detail),
    re_path(r'^api/user$', views.user_list),
    re_path(r'^api/loginuser$', views.current_user_detail)


]

