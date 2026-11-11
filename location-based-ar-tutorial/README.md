# Location Based AR Tutorial (AR.js v3 + A-Frame)

Три примера по статье «Build your Location-Based Augmented Reality Web App».

| Папка | Что делает |
|---|---|
| `static-on-html/` | Места добавлены прямо в HTML (нужно вписать свои координаты) |
| `static-places/` | Место добавляется из JS, кнопка меняет фигуру |
| `dynamic-places/` | Места рядом подгружаются из OpenStreetMap (Overpass), ключи не нужны |

## Запуск
1. Камера и геолокация работают только по HTTPS (или на localhost): выложите папку на GitHub Pages.
2. Откройте страницу на телефоне, разрешите камеру и геолокацию.
3. Тестируйте на улице: внутри зданий GPS неточен.

## Отличия от оригинала
- Оригинал написан под AR.js v2 (`gps-camera`, `gps-entity-place`); здесь v3 (`gps-new-camera`, `gps-new-entity-place`).
- Вместо 3D-моделей покемонов используются простые фигуры A-Frame.
- Вместо Foursquare используется OpenStreetMap Overpass.
