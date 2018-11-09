var cart = {}; //моя корзина

$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data){
            out+='<div class="single-goods">';
            out+='<h3>'+data[key].name+'</h3>';
            out+='<p>Цена: '+data[key].cost+'</p>';
            out+='<button class="add-to-cart" data-art="'+key+'" >Купить</button>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    //console.log(cart);
    showMiniCart();
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    //показываю содержимое корзины
    $.getJSON('goods.json',function (data) {
        var goods = data;
        ShowCart();
        function ShowCart() {
            sum = 0;
            out = 'Карзина<br>';
            for (var id in cart) {
                out += '<button class="delete" data-art="' + id + '" >x</button>';
                out += goods[id].name;
                out += '<button class="minus" data-art="' + id + '" >-</button>';
                out += cart[id];
                out += '<button class="plus" data-art="' + id + '" >+</button>';
                out += cart[id] * goods[id].cost;
                out += '<br>';
                sum += cart[id] * goods[id].cost;
            }
            out +='Итог:'+sum.toString()+'руб.';
            $('#mini-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
        //увеличение кол-ва продуктов
        function plusGoods(){
            var articul = $(this).attr('data-art');
            cart[articul]++;
            localStorage.setItem('cart', JSON.stringify(cart) );
            ShowCart();
        }
        function minusGoods(){
            var articul = $(this).attr('data-art');
            if ( cart[articul]>1 ){
                cart[articul]--;
            }else{
                delete cart[articul];
            }
            localStorage.setItem('cart', JSON.stringify(cart) );
            ShowCart();
        }
        function deleteGoods(){
            var articul = $(this).attr('data-art');
            delete cart[articul];
            localStorage.setItem('cart', JSON.stringify(cart) );
            ShowCart();
        }


    });



}
