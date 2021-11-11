
# Access

Module to handle authentication

## Signin

Retrive token with credentials

**Method**: POST

**Route**: access/signin

**AuthRequire**: false

**Body**:  

```json
{
  userId: string 
  password: string
}
```

**ResponseBody**:

```json
{
  userId: string,
  token: string,
}
```

## Signup

Create new user in the system

**Method**: POST

**Route**: access/signup

**AuthRequire**: false

**Body**:  

```json
{
  password: string
}
```

**ResponseBody**:

```json
{
  userId: string,
  token: string,
}
```

# Family

Module to handle Persons and his children

## AddPerson

Add a new person entity

**Method**: POST

**Route**: family

**AuthRequire**: true

**Body**:  

```json
{
  name: string,
  lastname: string,
  gender: string ( male, female, other ) = other,
  age: int = 0,
  married: bool = false,
}
```

## ChangePersonPersonalData

Update a person personal data by its id

**Method**: PATCH

**Route**: family

**AuthRequire**: true

**Body**:  

```json
{
  personId: string,
  name?: string,
  lastname?: string,
  gender?: string,
  age?: int ,
  married?: bool,
}
```

## RemovePerson

Remove a Person and its children

**Method**: DELETE

**Route**: family/:personId

**AuthRequire**: true

**Param**: personId

## AddChildToPerson

Add a new child to a person

**Method**: POST

**Route**: family/addChild

**AuthRequire**: true

**Body**:  

```json
{
  personId: string,
  childName: string,
}
```

## RemoveChildFromPerson

Remove a child from a person

**Method**: DELETE

**Route**: family/removeChild/:personId/:childId

**AuthRequire**: true

**Param**:

* personId
* childId

## OnePerson

Get one person with all its children

**Method**: GET

**Route**: family/:personId

**AuthRequire**: true

**Param**:

* personId

**ResponseBody**:

```json
{
  id: string,
  name: string,
  lastname: string,
  gender: string,
  married: bool,
  age: int,
  children: [ { id: string, name: string } ]
}
```

## AllPerson

Get all persons with their number of children

**Method**: GET

**Route**: family

**AuthRequire**: true

**ResponseBody**:

```json
[
  {
    id: string,
    name: string,
    lastname: string,
    gender: string,
    married: bool,
    age: int,
    childNumber: int,
  }
]
```
