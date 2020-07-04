
jQuery(document).ready(function ($) {

  $('[data-type="modal-trigger"]').on('click', function () {
    var actionBtn = $(this),
      scaleValue = retrieveScale(actionBtn.next('.consectetu-section-bg'));

    actionBtn.addClass('to-circle');
    actionBtn.next('.consectetu-section-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      animateLayer(actionBtn.next('.consectetu-section-bg'), scaleValue, true);
    });

    if (actionBtn.parents('.no-csstransitions').length > 0) animateLayer(actionBtn.next('.consectetu-section-bg'), scaleValue, true);
  });

  $('.compute-science .consectetu-section-close').on('click', function () {
    closeModal();
  });
  $(document).keyup(function (event) {
    if (event.which == '27') closeModal();
  });

  $(window).on('resize', function () {
    //on window resize - update cover layer dimention and position
    if ($('.compute-science.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
  });

  function retrieveScale(btn) {
    var btnRadius = btn.width() / 2,
      left = btn.offset().left + btnRadius,
      top = btn.offset().top + btnRadius - $(window).scrollTop(),
      scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

    btn.css('position', 'fixed').velocity({
      top: top - btnRadius,
      left: left - btnRadius,
      translateX: 0,
    }, 0);

    return scale;
  }

  function scaleValue(topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = (leftValue > windowW / 2) ? leftValue : (windowW - leftValue),
      maxDistVert = (topValue > windowH / 2) ? topValue : (windowH - topValue);
    return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radiusValue);
  }

  function animateLayer(layer, scaleVal, bool) {
    layer.velocity({ scale: scaleVal }, 400, function () {
      $('body').toggleClass('overflow-hidden', bool);
      (bool)
        ? layer.parents('.compute-science').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')
        : layer.removeClass('is-visible').removeAttr('style').siblings('[data-type="modal-trigger"]').removeClass('to-circle');
    });
  }

  function updateLayer() {
    var layer = $('.compute-science.modal-is-visible').find('.consectetu-section-bg'),
      layerRadius = layer.width() / 2,
      layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
      layerLeft = layer.siblings('.btn').offset().left + layerRadius,
      scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());

    layer.velocity({
      top: layerTop - layerRadius,
      left: layerLeft - layerRadius,
      scale: scale,
    }, 0);
  }

  function closeModal() {
    var section = $('.compute-science.modal-is-visible');
    section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      animateLayer(section.find('.consectetu-section-bg'), 1, false);
    });

    if (section.parents('.no-csstransitions').length > 0) animateLayer(section.find('.consectetu-section-bg'), 1, false);
  }
});