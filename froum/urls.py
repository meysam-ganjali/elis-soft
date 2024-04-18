from django.urls import path
from . import views

app_name = 'forum'
urlpatterns = [
    path('', views.ForumView.as_view(), name='home'),
    path('question/', views.QuestionView.as_view(), name='question'),
]
