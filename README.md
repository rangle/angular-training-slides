# Angular Training Materials

This repository contains slides and other materials
used in [Rangle.io][rangle]'s Angular training course.
The slides are written in [Markdown][markdown]
and use [Reveal.js][reveal] for display.
Instructors are strongly encouraged to file issues and submit pull requests
with suggestions, corrections, extensions, and other improvements.

## The Vision Thing

Our teaching relies on *live coding*.
Instead of presenting slides to learners,
instructors write code as they go along,
using whatever tools they would use in real life.
Live coding's advantages are:

1.  Watching a program being written is more compelling than watching
    someone page through slides that present bits and pieces of the same
    code.

1.  It enables instructors to be more responsive to "what if?"
    questions. Where a slide deck is like a railway track, live coding
    allows instructors to go off road and follow their learners'
    interests.

1.  People learn more than we realize we are teaching by watching
    *how* instructors do things.

1.  It slows the instructor down: if she has to type in the program as
    she goes along, she can only go twice as fast as her learners,
    rather than ten times faster as she could with slides.

1.  Learners get to see instructors' mistakes *and how to diagnose
    and correct them*. Novices are going to spend most of their time
    doing this, but it's left out of most textbooks.

1.  Watching instructors make mistakes shows learners that it's all
    right to make mistakes of their own.  Most people model the behavior of
    their teachers: if the instructor isn't embarrassed about making and
    talking about mistakes, learners will be more comfortable doing so
    too.

Live coding doesn't make slides irrelevant.
Instead, they serve two purposes:

1.  Instructors read them *before* the lesson to be sure they have a
    clear picture of the lesson's flow.

1.  Learners read them *after* the lesson for review and reference.
    They can also be given a printed copy of the slides to mark up
    during the lesson so that they don't have to take notes from
    scratch.

The first point is essential for supporting collaboration among instructors.
In order for two or more people to teach together effectively,
they must have a shared road map of what they are going to do.
They may improvise on top of that like jazz musicians improvise on top of a score,
but a quick review of a shared slide deck before a class
can prevent a lot of crossed wires, dropped balls, and other metaphors.

These slides also help instructors share new and improved ideas with their peers.
If one person comes up with a clever way to explain a complex idea,
she can (and should) submit a pull request to add her discovery to the slides.
Other people who are teaching this material can watch for incoming changes,
or look at the differences between the slides as they were the last time they taught
and the slides as they are today
and see what we have collectively learned about how best to teach this topic.

## How to View

These slides use [Reveal.js][reveal].
The first time you want to view them on your computer,
you must:

1.  Check out [this repository][repo] from GitHub.

1.  Go into the project's `slides` directory.

1.  Run `npm install` to install the JavaScript packages needed by [Reveal.js][reveal].

You only need to do these steps once.
After that,
you can view the slides at any time:

1.  Run `npm start` in the `./slides/` directory to run a local server.
    This uses port 8081 by default,
    and will fail with an error if that port is in use.

1.  Go to [http://localhost:8081](http://localhost:8081/) in your browser.

If you edit the slides' source,
the browser automatically redisplays within a second or two.

## How to Edit

1.  The overall directory structure of `./slides/` is fixed by [Reveal.js][reveal].
    Please do not make wholesale changes without careful testing.

1.  Slide content is stored in multiple Markdown files in `./slides/src/content`.
    Each file contains the source for several slides, separated by triple dashes.
    More files can be added here as needed;
    the format of each file is described below.

1.  Images used in the slides should be put in `./slides/src/content/images`,
    and must be referred to in Markdown files using relative paths of the form
    `content/images/filename.ext`.

1.  Instructors' biographies and photos are in `./slides/src/content/bios`.

1.  `./slides/src/index.html` determines the order in which slide files are displayed.
    To include a new file, copy an existing inclusion and edit the filename.

Markdown slides are separated from each other by `---` (three dashes).
The first (title) slide of each file must be:

~~~
<!-- .slide: data-background="../content/images/title-slide.jpg" -->
<!-- .slide: id="SECTION_SLUG" -->
##  Building Applications with Angular

# SECTION_TITLE
~~~

where `SECTION_TITLE` is the title of this section, and `SECTION_SLUG`
is a unique stem for slide identifiers (typically the stem of the
Markdown file's name).  For example, the section on Augury uses
`Augury` as the title and `augury` as the slug.

Regular slides are formatted as:

~~~
<!-- .slide: id="SLIDE_SLUG" -->
## SLIDE_TITLE

- Bullet
- Bullet

#####_path/to/example/file_
```FILE_TYPE
code sample
```
~~~

`SLIDE_SLUG` must be a hyphenated unique identifier for this particular slide
starting with the slug for the section.  For example, the first content slide
in the section on Augury has `augury-installing` as its ID.  [Reveal.js][reveal]
uses these IDs to create unique (bookmarkable) URLs for the slides, which in
turn allows us to refer to particular slides when filing issues.

The slide's title should be brief (no more than 3-4 words) and Title Cased.

Every code sample should have an H5-level heading immediately in front
of it with the path to the file containing the code in italics.  The
code block introduced by triple backquotes should specify a file type
for syntax highlighting, such as `ts` (for TypeScript), `js` (for plain
old JavaScript), or `html` (for HTML).

Slides with quiz questions should have the following header:

~~~
<!-- .slide: id="SECTION-quiz-NUMBER" -->
<!-- .slide: data-background="../content/images/question-slide.jpg" -->

## Quiz
~~~

The important differences between these slides and regular slides are
the use of `quiz` and a sequence number in the ID, and the inclusion
of the "question" slide background image.

Every quiz should also have answers on a sub-slide.  To separate a
sub-slide from a regular slide, use `+++` instead of `---`.  The
sub-slide should then look like this:

~~~
+++
<!-- .slide: data-background="../content/images/answer-slide.jpg" -->

## Answer
~~~

The first line after `+++` includes the "answer" background image.
The sub-slide's title should always be "Answer".

## For Each Training Class

1.  Create a branch in this repository named after the start date of the training,
    e.g., `2017-01-01` for a training class that starts on January 1, 2017.
    (We name branches this way so that client names do not appear in the repository,
    and to make it easier to track the evolution of material.)

1.  Modify `./slides/src/content/introduction.md` to include the biographies of the instructors,
    the class's schedule, and other specific information.
    Please do *not* include these changes in any PRs you submit to improve the core material.

1.  If you have been asked to create a PDF handout,
    you can do so directly from the slides.
    After starting the server,
    go to [http://localhost:8081/?print-pdf](http://localhost:8081/?print-pdf)
    and using Google Chrome's print utility to create and save a PDF.

[markdown]: https://en.wikipedia.org/wiki/Markdown
[rangle]: http://rangle.io
[repo]: https://github.com/rangle/angular-training-slides
[reveal]: http://lab.hakim.se/reveal-js/
