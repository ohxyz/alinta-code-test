# Assumptions

Initially there are a few customers, defined in `data.json`

# Briefings

1. Created a `DataTable` component as a main UI to manage customers. UI's update like `edit mode` or `add a new row` are managed by component's state.
2. The change of data of customers is managed by `redux`
3. The reducer comprises of two parts. First, return the next state after an action dispatched. Second, `persons` object in `reducers.ts` is considered a database of all customers. When `add` or `delete` happens, the `persons` object gets updated accordingly.

# Todos

1. Move the update of `persons` object in reducer function's third parameter `enhancer` as a middleware. It will help split the logic between UI related data - states and the data layer - `persons` object. In real cases, it is more likely the customer data is from a web service.
2. More tests ....

# Demo

http://www.runademo.com/alinta-code-test
