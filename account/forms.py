from django import forms
from .models import Counseling


class CounselingForm(forms.ModelForm):
    class Meta:
        model = Counseling
        fields = ['name', 'phone']
        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'form-control rounded-2', 'id': 'txt_name', 'placeholder': 'نام و نام خانوادگی'}),
            'phone': forms.TextInput(
                attrs={'class': 'form-control rounded-2', 'id': 'txt_phone', 'placeholder': 'تلفن'})
        }
