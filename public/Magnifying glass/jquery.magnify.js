(function ($) {
  $.fn.magnify = function (oOptions) {
    oOptions = $.extend({
      'src': '',
      'speed': 100,
      'timeout': -1,
      'touchBottomOffset': 0,
      'finalWidth': null,
      'finalHeight': null,
      'magnifiedWidth': null,
      'magnifiedHeight': null,
      'limitBounds': false,
      'mobileCloseEvent': 'touchstart',
      'afterLoad': function () { }
    }, oOptions);

    var $that = this,
      $html = $('html'),

      init = function (el) {
        var $image = $(el),
          $anchor = $image.closest('a'),
          oDataAttr = {};

        for (var i in oOptions) {
          oDataAttr[i] = $image.attr('data-magnify-' + i.toLowerCase());
        }

        var sZoomSrc = oDataAttr['src'] || oOptions['src'] || $anchor.attr('href') || '';
        if (!sZoomSrc) return;

        var $container,
          $lens,
          nImageWidth,
          nImageHeight,
          nMagnifiedWidth,
          nMagnifiedHeight,
          nLensWidth,
          nLensHeight,
          nBoundX = 0,
          nBoundY = 0,
          nPosX, nPosY,
          nX, nY,
          oContainerOffset,
          oImageOffset,
          getOffset = function () {
            var o = $container.offset();
            oImageOffset = {
              'top': ($image.offset().top - o.top) + parseInt($image.css('border-top-width')) + parseInt($image.css('padding-top')),
              'left': ($image.offset().left - o.left) + parseInt($image.css('border-left-width')) + parseInt($image.css('padding-left'))
            };
            o.top += oImageOffset['top'];
            o.left += oImageOffset['left'];
            return o;
          },
          hideLens = function () {
            if ($lens.is(':visible')) $lens.fadeOut(oOptions['speed'], function () {
              $html.removeClass('magnifying').trigger('magnifyend');
            });
          },
          moveLens = function (e) {
            if (!nImageHeight) {
              refresh();
              return;
            }
            if (e) {
              e.preventDefault();
              nPosX = e.pageX || e.originalEvent.touches[0].pageX;
              nPosY = e.pageY || e.originalEvent.touches[0].pageY;
              $image.data('lastPos', {
                'x': nPosX,
                'y': nPosY
              });
            } else {
              nPosX = $image.data('lastPos').x;
              nPosY = $image.data('lastPos').y;
            }
            nX = nPosX - oContainerOffset['left'],
              nY = (nPosY - oContainerOffset['top']) - oOptions['touchBottomOffset'];
            if (!$lens.is(':animated')) {
              if (nX > nBoundX && nX < nImageWidth - nBoundX && nY > nBoundY && nY < nImageHeight - nBoundY) {
                if ($lens.is(':hidden')) {
                  $html.addClass('magnifying').trigger('magnifystart');
                  $lens.fadeIn(oOptions['speed']);
                }
              } else {
                hideLens();
              }
            }
            if ($lens.is(':visible')) {
              var sBgPos = '';
              if (nMagnifiedWidth && nMagnifiedHeight) {
                var nRatioX = -Math.round(nX / nImageWidth * nMagnifiedWidth - nLensWidth / 2),
                  nRatioY = -Math.round(nY / nImageHeight * nMagnifiedHeight - nLensHeight / 2);
                if (oOptions['limitBounds']) {
                  var nBoundRight = -Math.round((nImageWidth - nBoundX) / nImageWidth * nMagnifiedWidth - nLensWidth / 2),
                    nBoundBottom = -Math.round((nImageHeight - nBoundY) / nImageHeight * nMagnifiedHeight - nLensHeight / 2);
                  if (nRatioX > 0) nRatioX = 0;
                  else if (nRatioX < nBoundRight) nRatioX = nBoundRight;
                  if (nRatioY > 0) nRatioY = 0;
                  else if (nRatioY < nBoundBottom) nRatioY = nBoundBottom;
                }
                sBgPos = nRatioX + 'px ' + nRatioY + 'px';
              }
              $lens.css({
                'top': Math.round(nY - nLensHeight / 2) + oImageOffset['top'] + 'px',
                'left': Math.round(nX - nLensWidth / 2) + oImageOffset['left'] + 'px',
                'background-position': sBgPos
              });
            }
          };

        if (!isNaN(+oDataAttr['speed'])) oOptions['speed'] = +oDataAttr['speed'];
        if (!isNaN(+oDataAttr['timeout'])) oOptions['timeout'] = +oDataAttr['timeout'];
        if (!isNaN(+oDataAttr['finalWidth'])) oOptions['finalWidth'] = +oDataAttr['finalWidth'];
        if (!isNaN(+oDataAttr['finalHeight'])) oOptions['finalHeight'] = +oDataAttr['finalHeight'];
        if (!isNaN(+oDataAttr['magnifiedWidth'])) oOptions['magnifiedWidth'] = +oDataAttr['magnifiedWidth'];
        if (!isNaN(+oDataAttr['magnifiedHeight'])) oOptions['magnifiedHeight'] = +oDataAttr['magnifiedHeight'];
        if (oDataAttr['limitBounds'] === 'true') oOptions['limitBounds'] = true;
        if (typeof window[oDataAttr['afterLoad']] === 'function') oOptions.afterLoad = window[oDataAttr['afterLoad']];

        if (/\b(Android|BlackBerry|IEMobile|iPad|iPhone|Mobile|Opera Mini)\b/.test(navigator.userAgent)) {
          if (!isNaN(+oDataAttr['touchBottomOffset'])) oOptions['touchBottomOffset'] = +oDataAttr['touchBottomOffset'];
        } else {
          oOptions['touchBottomOffset'] = 0;
        }

        $image.data('originalStyle', $image.attr('style'));

        var elZoomImage = new Image();
        $(elZoomImage).on({
          'load': function () {

            $image.css('display', 'block');
            if (!$image.parent('.magnify').length) {
              $image.wrap('<div class="magnify"></div>');
            }
            $container = $image.parent('.magnify');
            if ($image.prev('.magnify-lens').length) {
              $container.children('.magnify-lens').css('background-image', 'url(\'' + sZoomSrc + '\')');
            } else {
              $image.before('<div class="magnify-lens loading" style="background:url(\'' + sZoomSrc + '\') 0 0 no-repeat"></div>');
            }
            $lens = $container.children('.magnify-lens');
            $lens.removeClass('loading');
            nImageWidth = oOptions['finalWidth'] || $image.width();
            nImageHeight = oOptions['finalHeight'] || $image.height();
            nMagnifiedWidth = oOptions['magnifiedWidth'] || elZoomImage.width;
            nMagnifiedHeight = oOptions['magnifiedHeight'] || elZoomImage.height;
            nLensWidth = $lens.width();
            nLensHeight = $lens.height();
            oContainerOffset = getOffset();
            if (oOptions['limitBounds']) {
              nBoundX = (nLensWidth / 2) / (nMagnifiedWidth / nImageWidth);
              nBoundY = (nLensHeight / 2) / (nMagnifiedHeight / nImageHeight);
            }
            if (nMagnifiedWidth !== elZoomImage.width || nMagnifiedHeight !== elZoomImage.height) {
              $lens.css('background-size', nMagnifiedWidth + 'px ' + nMagnifiedHeight + 'px');
            }
            $image.data('zoomSize', {
              'width': nMagnifiedWidth,
              'height': nMagnifiedHeight
            });
            $container.data('mobileCloseEvent', oDataAttr['mobileCloseEvent'] || oOptions['mobileCloseEvent']);
            elZoomImage = null;
            oOptions.afterLoad();
            if ($lens.is(':visible')) moveLens();
            $container.off().on({
              'mousemove touchmove': moveLens,
              'mouseenter': function () {
                oContainerOffset = getOffset();
              },
              'mouseleave': hideLens
            });

            if (oOptions['timeout'] >= 0) {
              $container.on('touchend', function () {
                setTimeout(hideLens, oOptions['timeout']);
              });
            }
            $('body').not($container).on('touchstart', hideLens);
            var sUsemap = $image.attr('usemap');
            if (sUsemap) {
              var $map = $('map[name=' + sUsemap.slice(1) + ']');
              $image.after($map);
              $container.click(function (e) {
                if (e.clientX || e.clientY) {
                  $lens.hide();
                  var elPoint = document.elementFromPoint(
                    e.clientX || e.originalEvent.touches[0].clientX,
                    e.clientY || e.originalEvent.touches[0].clientY
                  );
                  if (elPoint.nodeName === 'AREA') {
                    elPoint.click();
                  } else {
                    $('area', $map).each(function () {
                      var a = $(this).attr('coords').split(',');
                      if (nX >= a[0] && nX <= a[2] && nY >= a[1] && nY <= a[3]) {
                        this.click();
                        return false;
                      }
                    });
                  }
                }
              });
            }

            if ($anchor.length) {
              $anchor.css('display', 'inline-block');
              if ($anchor.attr('href') && !(oDataAttr['src'] || oOptions['src'])) {
                $anchor.click(function (e) {
                  e.preventDefault();
                });
              }
            }

          },
          'error': function () {
            elZoomImage = null;
          }
        });

        elZoomImage.src = sZoomSrc;
      },

      nTimer = 0,
      refresh = function () {
        clearTimeout(nTimer);
        nTimer = setTimeout(function () {
          $that.destroy();
          $that.magnify(oOptions);
        }, 100);
      };

    this.destroy = function () {
      this.each(function () {
        var $this = $(this),
          $lens = $this.prev('div.magnify-lens'),
          sStyle = $this.data('originalStyle');
        if ($this.parent('div.magnify').length && $lens.length) {
          if (sStyle) $this.attr('style', sStyle);
          else $this.removeAttr('style');
          $this.unwrap();
          $lens.remove();
        }
      });
      $(window).off('resize', refresh);
      return $that;
    }

    $(window).resize(refresh);

    return this.each(function () {
      init(this);
    });

  };
}(jQuery));
