<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## 安裝教學

### 從零開始

1. XAMPP(跑 php 和 MySQL)
2. php composer(類似 node.js 的 npm)
3. 安裝 laravel 安裝器 (類似 VueCLI)
    - `composer global require "laravel/installer"`
4. 新增專案的指令，記得放在 `C:\xampp\htdocs` 下面才能執行 php
    - `laravel new haha-project`
5. 跑起來的指令
    - `php artisan ser`

---

### 拉別人的專案步驟

如果有 DB 要記得先建立

-   `composer install`
-   `composer update`
-   `php artisan ser`

## 開始寫 API

-   先建立 DB
-   新建動物資源檔案
    -   產生 3 劍客 `Model` `Controller` `migration`
        -   `php artisan make:model Animal -rmc`
    -   編輯 xxxx_xx_xx_create_xxx_xxx.php ， 新增 table 範例`2022_08_11_031748_create_animals_table.php`
    -   `php artisan migrate`
    -   補充 table type 　[語法文件](https://laravel.com/docs/8.x/migrations#available-column-types)
-   Controller

```php
index()
create()
store(Request $request)
show(Animal $animal)
edit(Animal $animal)
update(Request $request, Animal $animal)
destroy(Animal $animal)
*/
```
