from django import forms
from .models import Counseling, CustomerUser


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


class LoginForm(forms.ModelForm):
    class Meta:
        model = CustomerUser
        fields = ['user_phone', 'password']
        widgets = {
            'user_phone': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "Cellphone", 'class': "input-field"}),
            'password': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "Password", 'class': "input-field", 'type': "password"})
        }


class RegisterForm(forms.ModelForm):
    class Meta:
        model = CustomerUser
        fields = ['user_phone', 'password', 'name', 'family']
        widgets = {
            'user_phone': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "Cellphone", 'class': "input-field"}),
            'name': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "name", 'class': "input-field"}),
            'family': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "family", 'class': "input-field"}),
            'password': forms.TextInput(
                attrs={'autocomplete': "off", 'placeholder': "Password", 'class': "input-field", 'type': "password"})
        }
