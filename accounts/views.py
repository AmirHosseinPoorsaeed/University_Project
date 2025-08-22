from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash

from accounts.forms import UserLoginForm, UserProfileForm, UserRegistrationForm, UserUpdateForm


def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            remember_me = cd['remember_me']
            user = authenticate(
                request,
                username=cd['email'],
                password=cd['password'],
            )
            if user is not None:
                if user.is_active:
                    login(request, user)
                    messages.success(request, 'Login Successfully')

                    if not remember_me:
                        request.session.set_expiry(0)
                    else:
                        request.session.set_expiry(60 * 60 * 24 * 7)
                    return redirect('pages:home')
                else:
                    messages.warning(request, 'Disabled account')
            else:
                messages.error(request, 'Invalid login')
    else:
        form = UserLoginForm()

    return render(request, 'accounts/login.html', {
        'form': form,
    })


def user_register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(
                user_form.cleaned_data['password']
            )
            new_user.save()
            messages.success(request, 'Sign Up Successfully')
            return redirect('pages:home')
    else:
        user_form = UserRegistrationForm()

    return render(request, 'accounts/register.html', {
        'user_form': user_form
    })


def user_logout(request):
    logout(request)
    messages.success(request, 'Logout Successfully')
    return redirect('pages:home')


def user_profile(request):
    u_form = UserUpdateForm(instance=request.user)
    p_form = UserProfileForm(instance=request.user.profile)

    if request.method == 'POST':
        u_form = UserUpdateForm(
            request.POST,
            instance=request.user
        )
        p_form = UserProfileForm(
            request.POST,
            request.FILES,
            instance=request.user.profile
        )

        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            return redirect('accounts:profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = UserProfileForm(instance=request.user.profile)

    return render(request, 'accounts/profile.html', {
        'u_form': u_form,
        'p_form': p_form
    })


def user_change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('accounts:login')
    else:
        form = PasswordChangeForm(request.user)

    return render(request, 'accounts/change_password.html', {
        'form': form
    })
