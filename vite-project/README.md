## Descripcion

El presente repositorio contiene todo el codigo del frontend de la aplicacion realizada en el marco de la prueba pactica del proceso de seleccion de PayPros.
Dentro de este documento README se encuentra informacion relacionada a la instalacion e implementacion de la aplicacion.

## Instalacion

Una vez clonado el repositorio se debe instalar utilizando el siguiente comando en la terminal de la carpeta vite-project:

```bash
$ npm install
```

Luego de correr este comando en la terminal, se tendran instaladas todas las dependencias que fueron usadas en el presente proyecto.

Antes de correr la aplicacion es importante realizar una ultima configuracion.

1. Es necesario crear un documento ".env" que tiene que estar en la raiz de la aplicacion, tiene que estar al mismo nivel que el archivo example.env o el index.html.

2. Una vez creado dicho archivo, es necesario copiar la informacion que se encuentra dentro del archivo "example.env" y pegarla en el nuevo archivo ".env".

Deberia verse asi:

VITE_API_URL=http://localhost:3000

3. Ahora es importante modificar el valor de VITE_API_URL dependiendo del servidor en el que este corriendo el backend.
   VITE_API_URL es la url a la que la aplicacion va a hacer las solicitudes al backend. Es bastante normal que el backend use el puerto 3000, pero en caso de no estar usando este puerto, la aplicacion no hara las solicitudes a ningun lado.

Una vez ya creado el archivo ".env" y configurado VITE_API_URL ya se deberia poder correr la aplicacion.

## Correr la app

Para correr el servidor se debe correr el siguiente comando desde la terminal de la carpeta vite-project (para crear la terminal de la carpeta, se puede hacer click derecho sobre la misma y seleccionar la opcion "abrir en terminal integrado):

```bash
# development
$ npm run dev
```

## Consideraciones finales

El mayor desafio de la creacion del front end de la aplicacion fue el uso de TypeScript, ya que estaba acostumbrado a usar javaScript. Por momentos fue dificil acostumbrarme al uso de tipados. A fin de cuentas creo que fue una buena experiencia que me servira para mejorar como programador.
Para aprender lo basico de TypesScript realice un curso de Udemy e investigue en internet.

Tampoco estaba muy acostumbrado al uso de Tailwind ya que normalmente hago mis clases css o Scss para tener un mayor control sobre el diseño de mis aplicaciones.
Creo que al haber usado Bootstrap en otros momentos la implementacion de Tailwind Css no fue un gran problema.

---

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
