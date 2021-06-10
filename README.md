## Демо

Демонстрационную веб-версию приложения можно найти по адресу https://competent-cori-ad9d6c.netlify.app/ .

**Демо-приложение может работать значительно медленей, чем скомпилированное приложения для настольного компьютера, поэтому рекомендуется полноценная установка приложения на компьютер.**

## Установка

Для установки скомпилированного приложения используйте установщик одной из [опубликованных](https://github.com/ZVER3D/portable-octo-meme/releases) версий для Вашей операционной системы.

## Компиляция из исходного кода

Альтернативно, программу можно скомпилировать из исходного кода, для этого необходимо установить на Ваш компьютер среду разработки [Node.js](https://nodejs.org/) версии не ниже 10.x. Далее, следовать инструкциям:

1. Скачать исходный код программы из данного репозитория (или использовать команду `git clone https://github.com/ZVER3D/portable-octo-meme.git`)
1. Разархивировать полученный архив, открыть директорию с разархивированным кодом
1. Выполнить в этой директории с помощью терминала или консоли следующую команду:
   `npm install`
1. Выполнить команду `npm run build`
1. Выполнить команду `npm run package:dist --windows` ИЛИ `npm run package:dist --linux` в зависимости от операционной системы
1. Запустить сгенерированное в директории `packages` приложение

## Использование

Для использования программы введите нужные Вам значения в соответствующие поля ввода в программе и нажмите кнопку "Запустить". В зависимости от количества разбиений по времени и пространству, а также характеристик вашего компьютера, программе может потребоваться от нескольких секунд до нескольких минут.

Результаты работы программы можно сохранить себе на компьютер в виде \*.csv файлов, которые можно открыть, например, в MS Excel для просмотра результатов в виде таблицы.

Пример формата \*.csv файла (строки - слои по времени, столбцы - по пространству, значения в строке разделены точкой с запятой):

```
0;0.1;0.25;0.1;0
0;0.11;0.30;0.12;0
0;020;0.45;0.25;0
```

### Контактная информация

ipalatov@pm.com

## Лицензия

[MIT](https://choosealicense.com/licenses/mit/)
