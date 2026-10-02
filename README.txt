# UNA PREGUNTA — MVP

Sitio web estático, sin framework y sin costo de software.

## Archivos

- `index.html` → estructura de la página
- `styles.css` → diseño visual y responsive
- `app.js` → lógica de la experiencia y enlaces

## Antes de publicar

Abrí `app.js` y reemplazá:

```js
const CONFIG = {
  mercadoPagoUrl: "PEGAR_AQUI_TU_LINK_DE_MERCADO_PAGO",
  paypalUrl: "PEGAR_AQUI_TU_LINK_DE_PAYPAL",
  oracleFormUrl: "PEGAR_AQUI_EL_LINK_DE_TU_FORMULARIO"
};
```

por tus tres enlaces reales.

## Importante sobre pagos

Esta versión utiliza enlaces de pago externos. La web no verifica automáticamente si el pago fue aprobado.

El recorrido inicial es:

1. La persona recibe SÍ / NO / TODAVÍA NO.
2. Pulsa Mercado Pago o PayPal.
3. Realiza el aporte voluntario.
4. Vuelve a la experiencia y pulsa COMPLETAR FORMULARIO.
5. Tu formulario actual recibe la pregunta/email y continúa con tu sistema actual.

Para verificar pagos automáticamente y habilitar una entrega automática después del pago, más adelante necesitamos una integración con webhook/API o una automatización externa. Esa parte no puede resolverse de forma segura solo con HTML/CSS/JavaScript estático.

## Prueba local

No hace falta Node.js para esta versión.

Podés abrir `index.html` directamente con doble clic.

Para una prueba más cómoda en VS Code:
- instalá la extensión "Live Server"
- clic derecho sobre `index.html`
- "Open with Live Server"

## Publicación gratuita

GitHub Pages puede alojar este sitio estático. GitHub Free permite GitHub Pages y también permite asociar un dominio propio a un sitio.

El dominio se configura después desde:
Repositorio → Settings → Pages → Custom domain

Luego se agregan los registros DNS indicados por GitHub en el proveedor donde tengas comprado el dominio.

## Personalización

Los textos principales están en `index.html`.

Los colores, tipografías, tamaños y espacios están en `styles.css`.

La lógica de SÍ / NO / TODAVÍA NO está en `app.js`.
