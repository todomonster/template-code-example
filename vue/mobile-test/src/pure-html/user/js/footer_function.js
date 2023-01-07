(function footerRenderMain(data) {
    let content =
        '<footer class="c-footer"><div class="row ui-tabbar">'+
        footerRenderSub(data) +
        '</div></footer>';
    $('#footer-tabbar').before(content);
    $('#footer-tabbar').remove();
})(footerTabbar);

function footerRenderSub(raw) {
    let row = '';
    raw.forEach(function (el, k) {
        let activeIndex = $('#footer-tabbar').attr('active') || 0;
        let add = '';
        if ((k + 1) == activeIndex) add += ' active';
        if(el.class) add+= ' ' + el.class;

        if (el.dropdown) {
            row += type2(el, add);
        } else {
            row += type1(el, add);
        }
    });
    return row;
}

function type1(el, ad) {
    let class1 = 'col';
    let class2 = 'tab-link';
    class2 += ad;
    let row = '';
    row +=
        '<div class="' + class1 + '">' +
        '<a href="' + el.href + '" class="' + class2 + '">' +
        '<div class="tab-img">' +
        '<i class="' + el.icon + '"></i>' + '</div>' +
        '<div class="tab-title">' + el.text + '</div>' + '</a></div>';
    return row;
}

function type2(el, ad) {
    let class1 = 'col dropup';
    let class2 = 'tab-link dropdown-toggle';
    class2 += ad;
    let row = '';
    row +=
        '<div class="' + class1 + '">' +
        '<a href="' + el.href + '" class="' + class2 + '" data-bs-toggle="dropdown" aria-expanded="false">' +
        '<div class="tab-img">' +
        '<i class="' + el.icon + '"></i>' + '</div>' +
        '<div class="tab-title">' + el.text + '</div>' + '</a>' +
        '<ul class="dropdown-menu">';
    el.dropdown.forEach(function (dup) {
        if(dup['class']){
            row += '<li><a href="' + dup.href + '" class="dropdown-item ' + dup.class + '">' + dup.text + '</a></li>';
        }else{
            row += '<li><a href="' + dup.href + '" class="dropdown-item">' + dup.text + '</a></li>';
        }
    })
    row += '</ul></div>';
    return row;
}