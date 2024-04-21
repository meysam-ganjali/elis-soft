from django.urls import path
from . import views

app_name = 'forum'
urlpatterns = [
    path('', views.ForumView.as_view(), name='home'),
    path('question/<int:f_id>', views.QuestionView.as_view(), name='question'),
    path('answer/<int:f_id>', views.AnswerView.as_view(), name='answer'),
]
