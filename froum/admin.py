from django.contrib import admin
from .models import Froum, Question, Answer
from django.db.models.aggregates import Count


@admin.register(Froum)
class FroumAdmin(admin.ModelAdmin):
    list_display = ('froum_name', 'forum_logo', 'alt', 'title', 'count_q_of_forum')
    readonly_fields = ('forum_logo',)

    # اضافه کردن فیلد به جدول
    def get_queryset(self, *args, **kwargs):
        qs = super(FroumAdmin, self).get_queryset(*args, **kwargs)
        qs = qs.annotate(q_count=Count('question_froum'))
        return qs

    def count_q_of_forum(self, obj):
        return obj.q_count

    count_q_of_forum.short_description = 'تعداد سوال ها'


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    def active_q(modeladmin, request, queryset):
        res = queryset.update(is_active=True)
        message = f'تعداد {res} پاسخ فعال شد'
        modeladmin.message_user(request, message)

    def de_active_q(modeladmin, request, queryset):
        res = queryset.update(is_active=False)
        message = f'تعداد {res} پاسخ غیرفعال شد'
        modeladmin.message_user(request, message)

    list_display = ('title', 'is_active', 'register_date', 'user')
    list_editable = ('is_active',)
    actions = ['active_q', 'de_active_q']

    active_q.short_description = 'فعال سازی پاسخ انتخابی'
    de_active_q.short_description = 'غیرفعال سازی پاسخ انتخابی'


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    def active_a(modeladmin, request, queryset):
        res = queryset.update(is_active=True)
        message = f'تعداد {res} سوال فعال شد'
        modeladmin.message_user(request, message)

    def de_active_a(modeladmin, request, queryset):
        res = queryset.update(is_active=False)
        message = f'تعداد {res} سوال غیرفعال شد'
        modeladmin.message_user(request, message)

    list_display = ('id', 'answer', 'register_date', 'user', 'is_active')
    list_editable = ('is_active',)
    actions = ['active_q', 'de_active_q']

    active_a.short_description = 'فعال سازی سوالات انتخابی'
    de_active_a.short_description = 'غیرفعال سازی سوالات انتخابی'

