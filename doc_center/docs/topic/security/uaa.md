---
title: User Account and Authentication
---

<https://github.com/cloudfoundry/uaa/blob/develop/docs/attic/uaa_developers.pdf>

<https://github.com/cloudfoundry/uaa/blob/develop/docs/login/Login-APIs.md>


## Tokens

<https://github.com/cloudfoundry/uaa/blob/develop/docs/UAA-Tokens.md>

### Getting Started

```json
  {
      "exp": 1406612135, 
      "user_id": "7f791ea9-99b9-423d-988b-931f0222a79f", 
      "sub": "7f791ea9-99b9-423d-988b-931f0222a79f", 
      "cid": "app", 
      "iss": "http://localhost:8080/uaa/oauth/token", 
      "jti": "bc3e7456-91f5-4961-b88d-db705626ba77", 
      "client_id": "app", 
      "iat": 1406568935, 
      "scope": [
          "cloud_controller.read", 
          "cloud_controller.write", 
          "openid", 
          "password.write", 
          "scim.userids"
      ], 
      "grant_type": "password", 
      "user_name": "marissa", 
      "email": "marissa@test.org", 
      "aud": [
          "scim", 
          "openid", 
          "cloud_controller", 
          "password"
      ]
  }
```

  * user_id - a UUID for the user
  * cid/client_id - unique name for the client. Unique to the system it runs on.
  * scope - a list of permissions that this client has on behalf of this user
  * [aud](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-25#section-4.1.3) - the audience, who this token is intended for.

### Users and Clients and other actors

A user is often represented as a live person, or a process running.

A client is an application that acts on behalf of a user or act on its own.

A resource server is often defined as an application with access to a user's data

A brief and informative [tutorial](http://tutorials.jenkov.com/oauth2/index.html) has already been written.

### Grant types

An access token can be requested in four different ways, in the Oauth specification they are referred to as 
[grant types](http://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-1.3)

  1. client_credentials - no user involved. requesting a token to represent a client only
  2. password - the client uses the user's credentials and passes them to the UAA to generate a token
     This is the method we used in our example.
  3. implicit - this is similar to the password grant, but a client password(secret) is not needed
  4. authorization_code - in this scenario, the client never sees the user's credentials. It is the most secure
     grant type but relies on 302 redirects from the HTTP protocol.

### Scopes

When it comes to the UAA, and integrating with the UAA, you will be dealing with scopes. Scopes are essentially permissions, 
and are added as a [named parameter](http://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-3.3)
in the [access token](http://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-3.3).

In the Java world, often referred to as roles. Scopes in a token have two different names in the UAA token

  * scope - when the token represents a client acting on behalf of a user
  * authorities - when the token represents the client (application) itself

#### Client authorities, UAA groups and scopes

In the UAA each client has a list of ```client authorities```. This is ```List<String>``` of scopes
that represents the permissions the client has by itself. The second field the client has is the ```scopes``` field. 
The ```client scopes``` represents the permissions that the client uses when acting on behalf of a user.

In the UAA, a user belongs to one or more groups. A group in UAA, represents a scope in the Oauth world. Groups can be 
nested allowing easier management of group memberships.

When a token is requested by a client on behalf of a user the following process is followed

  1. The client is authenticated
  2. The user is authenticated
  3. The client scopes are retrieved
  4. The user scopes are retrieved
  5. A scope list is created with the shared scopes from step 3 and 4. 
  6. A token is generated, with the scope parameter from step 5.

#### Wildcard scopes

As scopes are arbitrary strings and those strings often containing dots to create a naming conventions.
For example, a resource server maintaining documents could create the following naming scheme

    document.<document id>.read
    document.<document id>.write
    document.<document id>.delete

A client that is accessing the resource server and reading, writing and deleting documents on behalf of a user, can be 
assigned the ```scope=document.*.read document.*.delete```. You can now assign scopes to the user in 
the form of

    document.asdsd-adasda-123212.write
    document.asdsd-adasda-123212.read
    document.wqere-adasda-adasda.read
    document.wqere-adasda-adasda.delete

The token representing the user's permission, would contain 

    document.asdsd-adasda-123212.read
    document.wqere-adasda-adasda.read
    document.wqere-adasda-adasda.delete
since the client does not have the ```write```.
The audience field for the token would be ```document```.

## [System for Cross-domain Identity Management (SCIM) ][]

Its intent is to **reduce the cost and complexity** of user management operations by providing a **common user schema and extension model**

[System for Cross-domain Identity Management: Definitions, Overview, Concepts, and Requirements](https://datatracker.ietf.org/doc/html/rfc7642)

[System for Cross-domain Identity Management: Core Schema](https://datatracker.ietf.org/doc/html/rfc7643)

[System for Cross-domain Identity Management: Protocol](https://datatracker.ietf.org/doc/html/rfc7644)

## CF-Identity-Services-Preface

Developers and administrators should have **secure and convenient** access to the Foundry platform itself. This includes being able to use an **external user account for authentication** rather than storing a password in a Foundry account. Authorization for some tasks should also be able to be given to others, i.e. delegated administration.&nbsp; Authorization should also be able to be **revoked**, causing access to be subsequently denied across the various Foundry components.

Some identity services that should be easily available to Foundry applications:

* Applications should be able to simply choose from **a number of external identity sources**
* External identity sources should be **accessible via federated identity protocols** with no impact on the application developer.&nbsp;
* Applications should be able to easily **connect to a user account service to store application specific data** and/or passwords.
* For API level access, applications should be able to simply **request or validate authorization tokens** from the identity service without requiring access to the users password.
* User authentication, authorization, and account information should be able to associated with the user's session within each existing application framework.

All identity services should be able to support **multi-tenant** applications (i.e. where users within the application come from multiple identity providers).

### Account Services

Support plugin for identity account system. Account system should provide **persistent storage for user information**, whether or not passwords are used. Should be able to **support provisioning** and schema similar to SCIM. User accounts should be able to be connected to the **session management system** within each framework.

### Authentication Services

Support plugin for authentication system. By supporting plugins we can provide direct authentication services via **LDAP** or **Foundry account services**, or federated authentication via OpenID, **OAuth**, or SAML, but not every application has to carry support for all authentication types. &nbsp;

Current expectation is that this service will need to have **some interaction with the application's login screen** -- either by providing some javascript code to the application or redirecting to code in the framework. After that, the application uses session capabilities of the framework.&nbsp;

## [UAA-APIs][]

1. There is an optional step in client registration, where a client declares which scopes it will ask for, or alternatively where the Authorization Server can limit the scopes it can ask for. The Authorization Server can then check that token requests contain a valid scope (i.e. one of the set provided on registration).

2. The Resource Servers can each have a unique ID (e.g. a URI). And another optional part of a client registration is to provide a set of allowed resource ids for the client in question.  The Authorization Server binds the allowed resource ids to the token and then provides the information via the ``/check_token`` endpoint (in the ``aud`` claim), so that a Resource Server can check that its own ID is on the allowed list for the token before serving a resource.

### Identity Zone Management APIs

The UAA supports multi tenancy. This is referred to as identity zones. An identity zones is accessed through a unique subdomain. If the standard UAA responds to https://uaa.10.244.0.34.xip.io a zone on this UAA would be accessed through https://testzone1.uaa.10.244.0.34.xip.io

A zone contains a unique identifier as well as a unique subdomain::

      {
          "id":"testzone1",
          "subdomain":"testzone1",
          "name":"The Twiglet Zone[testzone1]",
          "version":0,
          "description":"Like the Twilight Zone but tastier[testzone1].",
          "created":1426258488910,
          "last_modified":1426258488910
      }

The subdomain field will be converted into lowercase upon creation or update of an identity zone.
This way the UAA has an easy way to query the database for a zone based on a hostname.
The UAA by default creates a ``default zone``. This zone will always be present, the ID will always be
'uaa', and the subdomain is blank::

    {
        "id": "uaa",
        "subdomain": "",
        "name": "uaa",
        "version": 0,
        "description": "The system zone for backwards compatibility",
        "created": 946710000000,
        "last_modified": 946710000000
    }

Create or Update Identity Zones: ``POST or PUT /identity-zones``

POST and PUT requires the ``zones.write`` or ``zones.<zone id>.admin``  scope.

`uaac -t curl -H"X-Identity-Zone-Id:testzone1"`

### Identity Provider API: ``/identity-providers``

Within an identity zone you can have one or more identity providers. Identity providers are authentication sources for a user. Each identity zone will have a default identity provider named ``uaa``, with a type ``uaa`` and originKey='uaa'. This is the internal user database for each zone and is represented by the SCIM schema for users.

The UAA supports two additional types of identity providers, SAML and LDAP, and these providers can be created for a given zone.
Adding providers can be done by users that are Zone Administrators. These users are users in the UAA (default) zone, that have the scope ``zones.{zone id}.admin``. You can also create clients or users in the zone itself with the scopes ``idps.read`` and ``idps.write`` to perform these operations.

### User Account Management APIs

UAA supports the [SCIM](http://simplecloud.info) standard for
these APIs and endpoints.  These endpoints are themselves secured by OAuth2, and access decision is done based on the 'scope' and 'aud' fields of the JWT OAuth2 token.


[System for Cross-domain Identity Management (SCIM) ]: http://www.simplecloud.info/

[UAA-APIs]: https://github.com/cloudfoundry/uaa/blob/develop/docs/UAA-APIs.rst
