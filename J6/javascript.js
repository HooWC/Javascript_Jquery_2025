// 使用jQuery的简洁语法
$(function () {
    // 轮播图相关变量
    var $carousel = $('.carousel');
    var $slides = $('.carousel-slide');
    var $indicators = $('.indicator');
    var $thumbnails = $('.thumbnail');
    var currentIndex = 0;
    var slideCount = $slides.length;
    var slideInterval;
    var slideDuration = 3000; // 默认轮播速度
    var isPlaying = true;

    // 初始化轮播图
    function initCarousel() {
        // 设置第一张幻灯片为激活状态
        showSlide(currentIndex);
        // 开始自动播放
        startAutoPlay();
        // 绑定各种事件
        bindEvents();
    }

    // 显示特定索引的幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }

        // 更新当前索引
        currentIndex = index;

        // 更新幻灯片显示状态
        $slides.removeClass('active').eq(currentIndex).addClass('active');
        // 更新指示器状态
        $indicators.removeClass('active').eq(currentIndex).addClass('active');
        // 更新缩略图状态
        $thumbnails.removeClass('active').eq(currentIndex).addClass('active');
    }

    // 切换到下一张幻灯片
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 切换到上一张幻灯片
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 开始自动播放
    function startAutoPlay() {
        // 清除之前的定时器
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // 创建新的定时器
        slideInterval = setInterval(function () {
            nextSlide();
        }, slideDuration);
    }

    // 暂停自动播放
    function pauseAutoPlay() {
        clearInterval(slideInterval);
    }

    // 切换播放/暂停状态
    function togglePlayPause() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            startAutoPlay();
            $('#playPauseBtn').text('暂停');
        } else {
            pauseAutoPlay();
            $('#playPauseBtn').text('播放');
        }
    }

    // 设置轮播速度
    function setSpeed(speed) {
        slideDuration = speed;
        if (isPlaying) {
            startAutoPlay();
        }
    }

    // 绑定所有事件
    function bindEvents() {
        // 左右箭头点击事件
        $('.carousel-arrow.prev').on('click', function () {
            prevSlide();
            if (isPlaying) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        });

        $('.carousel-arrow.next').on('click', function () {
            nextSlide();
            if (isPlaying) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        });

        // 指示器点击事件
        $indicators.on('click', function () {
            var index = $(this).data('slide');
            showSlide(index);
            if (isPlaying) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        });

        // 缩略图点击事件
        $thumbnails.on('click', function () {
            var index = $(this).data('slide');
            showSlide(index);
            if (isPlaying) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        });

        // 播放/暂停按钮点击事件
        $('#playPauseBtn').on('click', togglePlayPause);

        // 速度控制按钮点击事件
        $('.speed-btn').on('click', function () {
            $('.speed-btn').removeClass('active');
            $(this).addClass('active');
            var speed = parseInt($(this).data('speed'));
            setSpeed(speed);
        });

        // 鼠标悬停暂停
        $carousel.on('mouseenter', function () {
            if (isPlaying) {
                pauseAutoPlay();
            }
        }).on('mouseleave', function () {
            if (isPlaying) {
                startAutoPlay();
            }
        });

        // 触摸事件支持
        var touchStartX = 0;
        var touchEndX = 0;

        $carousel.on('touchstart', function (e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });

        $carousel.on('touchend', function (e) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            // 判断滑动方向
            if (touchStartX - touchEndX > 50) {
                // 向左滑动，显示下一张
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                // 向右滑动，显示上一张
                prevSlide();
            }

            if (isPlaying) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        }

        // 键盘控制支持
        $(document).on('keydown', function (e) {
            if (e.keyCode === 37) { // 左箭头
                prevSlide();
            } else if (e.keyCode === 39) { // 右箭头
                nextSlide();
            } else if (e.keyCode === 32) { // 空格键
                togglePlayPause();
                return false; // 防止页面滚动
            }

            if (isPlaying && (e.keyCode === 37 || e.keyCode === 39)) {
                // 重置自动播放计时器
                startAutoPlay();
            }
        });
    }

    // 初始化轮播图
    initCarousel();
}); 