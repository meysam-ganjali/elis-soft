from django.shortcuts import render, redirect
from django.views import View

from .forms import AnswerForm
from .models import Froum, Question, Answer
from django.contrib import messages
from account.models import CustomerUser


class ForumView(View):
    def get(self, request, *args, **kwargs):
        forums = Froum.objects.all()
        return render(request, 'froum/forum.html', {
            'forum_lst': forums
        })


class QuestionView(View):
    def get(self, request, f_id: int):
        f_q = Question.objects.filter(froum_id=f_id)
        return render(request, 'froum/question.html', {
            'question_lst': f_q
        })


class AnswerView(View):
    def get(self, request, f_id: int):
        a = Answer.objects.filter(question_id=f_id)
        q = Question.objects.filter(id=f_id).first()
        return render(request, 'froum/answer.html', {
            'answer_lst': a,
            'question': q,
            'answer_frm': AnswerForm()
        })

    def post(self, request, f_id: int):
        a = Answer.objects.filter(question_id=f_id)
        q = Question.objects.filter(id=f_id).first()
        form = AnswerForm(request.POST)
        if form.is_valid():
            answer = form.cleaned_data['answer']
            Answer.objects.create(question_id=f_id, answer=answer, user=request.user, is_active=False)
            messages.success(request, f'{request.user} پاسخ شما با موفقیت ثبت گردید. ')
            return redirect('main:index')
        else:
            messages.error(request, f'{request.user}اطلاعات ارسالی نامعتبر است. ')
            return render(request, 'froum/answer.html', {
                'answer_lst': a,
                'question': q,
                'answer_frm': AnswerForm()
            })
