Insurance United
===============

A proof of concept for prototyping for a fictional entity.
* [demo](http://brito.github.com/InsuranceUnited/ "Live demo")
* [source](http://github.com/brito/InsuranceUnited "Source code")

These are not ready yet
* [presentation](http://rvl.io/brito/InsuranceUnited "Presentation deck")
* [video](http://youtube.com/darkgoyle/InsuranceUnited "Audio-visual")
* most of the links below don't work yet

Features
--------------------------
* register new member and sign-in
* get a quote, create and update policy details
* enroll
      
[html](http://darkgoyle.com/demos/iu/source/html)

Look and Feel
-----------------------
Typography, spacing, color base, skins
* [css/base](http://darkgoyle.com/demos/iu/source/css/base)

Media queries
* [css/media](http://darkgoyle.com/demos/iu/source/css/media)

Animations and transitions
* [css/4d](http://darkgoyle.com/demos/iu/source/css/4d)

Interaction Design
---------------
Adding response reflexes to user actions (interactivity)
* [js/on](http://darkgoyle.com/demos/iu/source/js/on)

Steps (input pacing - baby steps - form wizard)
* [js/step](http://darkgoyle.com/demos/iu/source/js/step)

Now you try
-----------
* [documentation](http://api.darkgoyle.com/)

How-To
------
Technical details on how the parts are built
* [REST-JSON database web service](http://nullisnull.blogspot.com/)

Changes
---------
* setup [database xhr API](http://darkgoyle.com/) - need docs
* added gnius source to debug call to interpolate
* add typographical logo
* [tested try/catch cost](http://jsperf.com/the-cost-of-trying) 
* add [favicon](http://brito.github.com/InsuranceUnited/favicon.png)
* add [apple-touch-icon](http://brito.github.com/InsuranceUnited/favicon.png)
* add [data schema](http://brito.github.com/InsuranceUnited/planning/schema.yml)
* add [json schema](http://brito.github.com/InsuranceUnited/planning/schema.js)
* add [html semantics](http://brito.github.com/InsuranceUnited/features/policy.html)
* add [styles](http://brito.github.com/InsuranceUnited/insuranceunited.css)
* add stepping through (like a form wizard)
    * show only current section (from location hash)
* add table styles
* feature "add a dependent" (and remove) is working now
* added cache buster for dynamic content fetch
* data from forms automatically captured!
    * input.onchange: roll up data to container

To do:
-----
* Wednesday, November 28
  * "looks like it works"
    * calculate and filter policies
      * add special data rules on policy fields
        * update name and legend - ok
        * add insured to data array when cloning
        * remove data when removing insured
    * data.onchange: save state
      * restore state
        * from mock
        * from db: sign in
          * register
            * CORS setup for darkgoyle.com db API 
  * fix overflow hidden on form
  * fix adaptive layout
  * fix: hash to load :target
    * check that back button works?
    
* Thursday, November 29
  * figure out why squeals are not cascading up the chain
  * 1200 can enroll in a plan 
    * register, sign-in and enroll
  * 2100 add [presentation slides](rvl.io)  

* fix mobile!
* add mock.js
* add tests.js
* add api.darkgoyle.com/db
* export jamestron.com/recognize.js
* export darkgoyle.com/jquery.snitch.js
* export darkgoyle.com/jquery.fetch.js

* add [custom domain]()
* all [tests]() pass
* add [presentation video]()
* add [webex setup]()

The future
----------
* add websockets demo
* set up automated build and deploy
* add story translator
  * into unit tests
* add css4d
* add schemata translator
  * into html
* Flying cars
* Personal robots