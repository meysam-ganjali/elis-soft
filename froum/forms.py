from django import forms
from .models import Answer


class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['answer']

    widgets = {
        'answer': forms.TextInput(
            attrs={'cols': "30", 'rows': "10"}),
    }
