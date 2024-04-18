from django.shortcuts import render, redirect
from django.views import View
from .models import  Froum

from account.models import CustomerUser


class ForumView(View):
    def get(self, request, *args, **kwargs):
        forums = Froum.objects.all()
        return render(request, 'froum/forum.html',{
            'forums': forums
        })


class QuestionView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'froum/question.html')
