from django import forms
from .models import Answer, Question


class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['answer']

    widgets = {
        'answer': forms.TextInput(
            attrs={'cols': "30", 'rows': "10"}),
    }


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['title', 'q']
        widgets = {
            'title': forms.TextInput(
                attrs={'class': 'form-control', 'placeholder': "عنوان سوال"}),
            'q': forms.TextInput(attrs={'cols': "30", 'rows': "10"}),
        }
