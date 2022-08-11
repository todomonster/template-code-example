
## 指令

```php
php artisan orchid:screen TransactionRecordScreen

建立 `routes\platform.php`關聯
// C:\xampp\htdocs\orchid-project\routes\platform.php
    //-
    use App\Orchid\Screens\TransactionRecordScreen;
    //-
    //-
    Route::screen('transaction', TransactionRecordScreen::class)
        ->name('platform.transaction')
        ->breadcrumbs(function (Trail $trail) {
            return $trail
                ->parent('platform.index')
                ->push('交易紀錄');
        });
    //-
建立 `\app\Orchid\PlatformProvider.php`側邊欄位關聯
// C:\xampp\htdocs\orchid-project\app\Orchid\PlatformProvider.php
    /**
     * @return Menu[]
     */
    public function registerMainMenu(): array
    {
        return [
            Menu::make('交易紀錄')
                ->icon('docs')
                ->route('platform.transaction'),

編輯內文表格
<?php

namespace App\Orchid\Screens;

use Orchid\Screen\Screen;

//
use Orchid\Screen\Repository;

use Orchid\Support\Facades\Layout;
use Orchid\Screen\Actions\Button;
use Orchid\Support\Facades\Toast;
use Orchid\Screen\TD;
use Illuminate\Support\Str;


//

class TransactionRecordScreen extends Screen
{
    /**
     * Fish text for the table.
     */
    public const TEXT_EXAMPLE = 'Lorem ipsum at sed ad fusce faucibus primis, potenti inceptos ad taciti nisi tristique
    urna etiam, primis ut lacus habitasse malesuada ut. Lectus aptent malesuada mattis ut etiam fusce nec sed viverra,
    semper mattis viverra malesuada quam metus vulputate torquent magna, lobortis nec nostra nibh sollicitudin
    erat in luctus.';
    /**
     * Query data.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'order'      => [new Repository([
                'product_id' => 'prod-100',
                'price'      => 10.24,
                'created_at' => '01.01.2020',
            ]), new Repository([
                'product_id' => 'prod-100',
                'price'      => 10.24,
                'created_at' => '01.01.2020',
            ])],
            'subject' => 'xxxxxxxxx',
            'charts'  => [
                [
                    'name'   => 'Some Data',
                    'values' => [25, 40, 30, 35, 8, 52, 17],
                    'labels' => ['12am-3am', '3am-6am', '6am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'],
                ],
                [
                    'name'   => 'Another Set',
                    'values' => [25, 50, -10, 15, 18, 32, 27],
                    'labels' => ['12am-3am', '3am-6am', '6am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'],
                ],
                [
                    'name'   => 'Yet Another',
                    'values' => [15, 20, -3, -15, 58, 12, -17],
                    'labels' => ['12am-3am', '3am-6am', '6am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'],
                ],
                [
                    'name'   => 'And Last',
                    'values' => [10, 33, -8, -3, 70, 20, -34],
                    'labels' => ['12am-3am', '3am-6am', '6am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'],
                ],
            ],
            'table'   => [
                new Repository(['id' => 100, 'name' => self::TEXT_EXAMPLE, 'price' => 10.24, 'created_at' => '01.01.2020']),
                new Repository(['id' => 200, 'name' => self::TEXT_EXAMPLE, 'price' => 65.9, 'created_at' => '01.01.2020']),
                new Repository(['id' => 300, 'name' => self::TEXT_EXAMPLE, 'price' => 754.2, 'created_at' => '01.01.2020']),
                new Repository(['id' => 400, 'name' => self::TEXT_EXAMPLE, 'price' => 0.1, 'created_at' => '01.01.2020']),
                new Repository(['id' => 500, 'name' => self::TEXT_EXAMPLE, 'price' => 0.15, 'created_at' => '01.01.2020']),

            ],
            'metrics' => [
                'sales'    => ['value' => number_format(6851), 'diff' => 10.08],
                'visitors' => ['value' => number_format(24668), 'diff' => -30.76],
                'orders'   => ['value' => number_format(10000), 'diff' => 0],
                'total'    => number_format(65661),
            ],
        ];
    }
    /**
     * Display header name.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return '我是測試頁面EmailSenderScreen';
    }
    /**
     * The description is displayed on the user's screen under the heading
     */
    public function description(): ?string
    {
        return "Tool that sends ad-hoc email messages.";
    }
    /**
     * Button commands.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Go print')->method('print')->novalidate()
                ->icon('bag'),
        ];
    }

    /**
     * Views.
     *
     * @return \Orchid\Screen\Layout[]|string[]
     */
    public function layout(): iterable
    {
        return [
            Layout::table('order', [
                TD::make('product_id', '會員編號'),
                TD::make('price', '店家編號'),
                TD::make('created_at', '建立時間')
            ]),
            Layout::table('table', [
                TD::make('id', 'ID')
                    ->width('150')
                    ->render(function (Repository $model) {
                        // Please use view('path')
                        return "<img src='https://picsum.photos/450/200?random={$model->get('id')}'
                              alt='sample'
                              class='mw-100 d-block img-fluid'>
                            <span class='small text-muted mt-1 mb-0'># {$model->get('id')}</span>";
                    }),

                TD::make('name', 'Name')
                    ->width('450')
                    ->render(function (Repository $model) {
                        return Str::limit($model->get('name'), 200);
                    }),

                TD::make('price', 'Price')
                    ->render(function (Repository $model) {
                        return '$ ' . number_format($model->get('price'), 2);
                    }),

                TD::make('created_at', 'Created'),
            ]),
        ];
    }

    public function print(): void
    {
        Toast::warning('Hello, world! This is a toast message.');
    }
}

```
