from pathlib import Path 
import os 
# Build paths inside the project like this: BASE_DIR / 'subdir'. 
 
BASE_DIR = Path(__file__).resolve().parent.parent 
 
 
SECRET_KEY = os.environ.get("SECRET_KEY") 
 
# SECURITY WARNING: don't run with debug turned on in production! 
DEBUG = int(os.environ.get("DEBUG", default=0)) 
 
ALLOWED_HOSTS = ['*'] 
 
 
# Application definition 
 
INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin', 
    'django.contrib.auth', 
    'django.contrib.contenttypes', 
    'django.contrib.sessions', 
    'django.contrib.messages', 
    'django.contrib.staticfiles', 
    'rest_framework', 
    'users', 
    'rooms', 
    'corsheaders', 
    'rest_framework.authtoken', 
    'channels',
] 
 
MIDDLEWARE = [ 
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware', 
    'django.middleware.common.CommonMiddleware', 
    'django.middleware.csrf.CsrfViewMiddleware', 
    'django.contrib.auth.middleware.AuthenticationMiddleware', 
    'django.contrib.messages.middleware.MessageMiddleware', 
    'django.middleware.clickjacking.XFrameOptionsMiddleware', 
] 
 
ROOT_URLCONF = 'watch_together_api.urls' 
 
TEMPLATES = [ 
    { 
        'BACKEND': 'django.template.backends.django.DjangoTemplates', 
        'DIRS': [], 
        'APP_DIRS': True, 
        'OPTIONS': { 
            'context_processors': [ 
                'django.template.context_processors.debug', 
                'django.template.context_processors.request', 
                'django.contrib.auth.context_processors.auth', 
                'django.contrib.messages.context_processors.messages', 
            ], 
        }, 
    }, 
] 
 
WSGI_APPLICATION = 'watch_together_api.wsgi.application' 
ASGI_APPLICATION = 'watch_together_api.asgi.application' 
 
#CHANNELS_REDIS_HOST = str(os.environ.get('CHANNELS_REDIS_HOST', default='localhost')) 
#CHANNELS_REDIS_PORT = int(os.environ.get('CHANNELS_REDIS_PORT', default=6379)) 
 
CHANNEL_LAYERS = {
    "default": { 
         "BACKEND": "channels.layers.InMemoryChannelLayer", 
        }, 
} 
 
# Database 
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases 
 
DATABASES = { 
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
} 
 
 
# Password validation 
 
AUTH_PASSWORD_VALIDATORS = [ 
    { 
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', 
    }, 
    { 
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 
    }, 
    { 
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', 
    }, 
    { 
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', 
    }, 
] 
 
 
# Internationalization 
 
LANGUAGE_CODE = 'en-us' 
 
TIME_ZONE = 'UTC' 
 
USE_I18N = True 
 
USE_TZ = True 
 
 
# Static files (CSS, JavaScript, Images) 
 
STATIC_URL = 'static/' 
 
# Default primary key field type 
 
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField' 
 
AUTH_USER_MODEL = 'users.User' 
 
# FRONTEND PORT ACCESS 
 
CORS_ORIGIN_ALLOW_ALL = True  
 
# COOKIES FOR FRONTEND 
 
CORS_ALLOW_CREDENTIALS = True 
 
REST_FRAMEWORK = { 
  
    'DEFAULT_AUTHENTICATION_CLASSES': [ 
        'rest_framework.authentication.TokenAuthentication', 
    ] 
}
