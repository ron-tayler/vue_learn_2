<template>
  <div id="header">
    <div class="header-left">
      <div id="rtf-show-sidebar" class="header-burger header-btn">
        <div class="header-burger-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="header-logo">
        <img
          class="header-logo-favicon"
          src="https://youinroll.com/lib/favicos/favicon.svg"
          alt="favicon-logo"
        />
        <img
          class="header-logo-main"
          src="https://youinroll.com/storage/uploads/logo-novoe-1-png60a247e5cb3d7.png"
          alt="main-logo"
        />
      </div>
    </div>
    <div class="header-center">
      <div class="header-search">
        <form action="" method="get" id="header-search-form" autocomplete="off">
          <div class="header-search-box">
            <div class="header-search-wrap">
              <input
                type="text"
                class="form-control input-lg empty"
                name="tag"
                value=""
                placeholder="Поиск по названию видео урока "
              />
            </div>
            <div class="header-search-button">
              <button type="submit" class="legitRipple">
                <i class="material-icons">search</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="header-right" v-if="isUser">
      <div class="dropdown">
        <div class="header-btn-load header-btn" data-toggle="dropdown">
          <img src="/tpl/main/images/camera.svg" alt="icon" />
        </div>
        <ul class="dropdown-menu dropdown-menu-left bs-ddm-upload">
          <li role="presentation">
            <a href="/add-video">
              <img src="/tpl/main_n/images/upload-video.svg" alt="icon" />
              <span>Загрузить видео</span>
            </a>
          </li>
          <li role="presentation">
            <a href="/add-image">
              <img src="/tpl/main_n/images/upload-image.svg" alt="icon" />
              <span>Создать публикацию</span>
            </a>
          </li>
          <li role="presentation">
            <a href="/studio/#/settings/stream-create">
              <img src="/tpl/main_n/images/start-stream.svg" alt="icon" />
              <span>Начать трансляцию</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <div class="header-btn-notify header-btn" data-toggle="dropdown">
          <img src="/tpl/main/images/notifications.svg" alt="icon" />
        </div>
        <div id="bs-ddm-notify" class="dropdown-menu dropdown-menu-left">
          <div id="notify-box"></div>
        </div>
        <!--
                <script>
                    $('#bs-ddm-notify').click((e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    $('#bs-ddm-notify').on('wheel',(e)=>{
                        e.stopPropagation();
                    });
                </script>
                -->
      </div>
      <div class="dropdown header-dropdown-profile">
        <div class="header-btn-profile header-btn" data-toggle="dropdown">
          <img data-name="Урсул Максим" src="/<?=$user_img?>" alt="logo" />
        </div>
        <ul class="dropdown-menu dropdown-menu-left">
          <li role="presentation">
            <a href="https://youinroll.com/payment">
              <i class="icon material-icons"></i>Премиум
            </a>
          </li>
          <li role="presentation">
            <a href="https://youinroll.com/studio">
              <i class="icon material-icons">new_releases</i>Видеостудия
            </a>
          </li>
          <li role="presentation">
            <a href="/dashboard/?sk=edit"
              ><i class="icon material-icons"></i>Настройки</a
            >
          </li>
          <li role="presentation">
            <a href="https://youinroll.com/me?sk=subscriptions">
              <i class="icon material-icons"></i>Подписки
            </a>
          </li>
          <li role="presentation">
            <a href="/me/?sk=images">
              <i class="icon material-icons"></i>Пост-менеджер</a
            >
          </li>
          <li role="presentation">
            <a href="moderator">
              <i class="icon material-icons"></i>Администрация
            </a>
          </li>
          <li role="presentation" class="drop-footer">
            <a href="/?action=logout"
              ><i class="icon material-icons"></i>Выход</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="header-right" v-else>
      <div class="header-btn-people header-btn" data-toggle="dropdown">
        <img src="/tpl/main/images/man-avatar.svg" alt="icon" />
        <router-link to="/login">Войти</router-link>
      </div>
    </div>
  </div>
</template>
<script src="./header.js"></script>
<style src="./header.css" scoped></style>
