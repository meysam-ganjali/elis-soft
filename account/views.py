from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from django.views import View

from account.forms import LoginForm, RegisterForm
from account.models import CustomerUser
from django.contrib import messages


class LoginView(View):
    def get(self, request):
        login_form = LoginForm()
        register_form = RegisterForm()
        return render(request, 'account/login.html', {
            'login_form': login_form,
            'register_form': register_form
        })

    def post(self, request):
        login_form = LoginForm(request.POST)
        print(len(login_form.data['password']))
        print(len(login_form.data['user_phone']))
        if len(login_form.data['password']) > 6 or len(login_form.data['user_phone']) >= 11:
            user_phone = login_form.data['user_phone']
            password = login_form.data['password']
            try:
                user = CustomerUser.objects.get(user_phone=user_phone)
                if user.check_password(password):
                    login(request, user)
                    return redirect(to='main:index')
            except CustomerUser.DoesNotExist:
                messages.error(request, 'کاربر یافت نشده. ابتدا ثبت نام کنید')
                return redirect(to='account:login')
        else:
            messages.error(request, 'اطلاعات وارد شده معتبر نمی باشد.')
            return redirect(to='account:login')


class RegisterView(View):
    def post(self, request):
        register_form = RegisterForm(request.POST)
        user_exist = CustomerUser.objects.filter(user_phone=register_form.data['user_phone'])
        if user_exist:
            messages.error(request, 'کاربر گرامی شماره وارد شده در سیستم وجود دارد. ')
            return redirect(to='account:login')

        if register_form.is_valid():
            user_phone = register_form.cleaned_data['user_phone']
            name = register_form.cleaned_data['name']
            family = register_form.cleaned_data['family']
            password = register_form.cleaned_data['password']
            user = CustomerUser.objects.create_user(user_phone=user_phone, name=name, family=family, password=password)
            messages.success(request, 'ثبت نام شما با موفقیت انجام شد')
            return redirect(to='account:login')
        else:
            messages.error(request, 'اطلاعات وارد شده معتبر نمی باشد.')
            return redirect(to='account:login')


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect(to='main:index')
