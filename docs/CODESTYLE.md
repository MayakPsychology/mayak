# Rules

Following listed rules which are considered mandatory to use, and pull requests violates these should not be approved.

## Use function declaration for React components

Wrong:

```javascript
const Header = (props) => {
  return
...
};

```

Right:

```javascript
function Header(props) {
  return
...
}

```

## Use in-place exports, rather than in the end of file

Wrong:

```javascript
const utility = () => {
  return
...
};

// some more code ...

export { utility };
```

Right:

```javascript
export const utility = () => {
  return
...
};
```

## Admin component folders/files conventions

- Start folder names with capital letters. For ex: `Organization` instead of `organization`.
- Filenames for files with feature components for specific model
  are `Create.js`, `Edit.js`, `DistrictList.js`, `Show.js`.
- These files should contain components with name consisting of the **model name** and **feature name**, for
  ex: `FaqList` or `EventCreate`. Here is example of using them in `AdminApp.js` in a resource.

```jsx
<Resource
  name={'specialist'}
  list={SpecialistList}
  edit={SpecialistEdit}
  show={SpecialistShow}
  create={SpecialistCreate}
/>
```

```
_components
└───Specialist
    ├───PlaceOfWork.js
    ├───SomeOtherSpecialistComponent.js
    ├───Create.js // File with SpecialistCreate component
    ├───Edit.js // File with SpecialistEdit component
    ├───Show.js // File with SpecialistShow component
    ├───List.js // File with SpecialistList component
    └───index.js
```

`Specialist/index.js` exports feature components so they can be imported to `AdminApp.js`

```js
export * from './Create';
export * from './DistrictList';
export * from './Edit';
export * from './Show';
```

Other components related to admin panel, but not related to a specific model (or can be reused across multiple models),
should be saved in the `admin/_components`
