from django.shortcuts import render, redirect
from django.views import View
from .forms import AnswerForm, QuestionForm
from .models import Froum, Question, Answer
from django.contrib import messages


class ForumView(View):
    def get(self, request, *args, **kwargs):
        forums = Froum.objects.all()
        return render(request, 'froum/forum.html', {
            'forum_lst': forums
        })


class QuestionView(View):
    def get(self, request, f_id: int):
        f_q = Question.objects.filter(froum_id=f_id, is_active=True)
        forum = Froum.objects.filter(id=f_id).first()

        return render(request, 'froum/question.html', {
            'question_lst': f_q,
            'forum_id': f_id,
            'forum_name': forum.froum_name,
            'q_count':f_q.select_related('question_answer').count()
        })


class AnswerView(View):
    def get(self, request, f_id: int):
        a = Answer.objects.filter(question_id=f_id, is_active=True)
        q = Question.objects.filter(id=f_id).first()

        return render(request, 'froum/answer.html', {
            'answer_lst': a,
            'question': q,
            'answer_frm': AnswerForm()
        })

    def post(self, request, f_id: int):
        if request.user.is_authenticated:
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
        else:
            return redirect('account:login')


class CreateQuestionView(View):
    def get(self, request, f_id: int):
        if request.user.is_authenticated:
            return render(request, 'froum/create_q.html', {
                'frm_question': QuestionForm(),
                'f_id': f_id
            })
        else:
            return redirect('account:login')

    def post(self, request, f_id: int):
        frm_q = QuestionForm(request.POST)
        if frm_q.is_valid():
            title = frm_q.cleaned_data['title']
            q = frm_q.cleaned_data['q']
            Question.objects.create(froum_id=f_id, title=title, user=request.user, is_active=False, q=q)
            messages.success(request, f'{request.user} سوال شما با موفقیت ثبت گردید. ')
            return redirect('main:index')
        else:
            messages.error(request, f'{request.user}اطلاعات ارسالی نامعتبر است. ')
            return render(request, 'froum/answer.html', {
                'frm_question': QuestionForm()
            })
