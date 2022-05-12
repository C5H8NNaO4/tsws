---
title: 10 Intersection Types
chapter: Basics
slug: basics/unoin-types
hasCode: true
position: 11
---

# Intersection types

Intersection types are closely related to union types, but they are used very differently.
An intersection type combines two or more types to create a new type that has **all properties** of the existing types.
This allows you to add together existing types to get a single type that has all the features you need.

An Intersection type uses the ampersand (`&`) to separate each type.

Intersection types are most often used with interfaces.
The following example defines two interfaces, `Employee` and `Manager`, and then creates a new intersection type called `ManagementEmployee` that combines the properties in both interfaces.

---

You will!!! learn more about interfaces in the Implement interfaces in TypeScript module.
