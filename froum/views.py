from django.shortcuts import render, redirect
from django.views import View

from account.models import CustomerUser


class ForumView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'froum/forum.html')


class QuestionView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'froum/question.html')
