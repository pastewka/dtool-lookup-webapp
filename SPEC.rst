dtool-lookup-webapp specification
=================================

.. |date| date::

:Author: Tjelvar Olsson
:Date: |date|
:Status: Draft

Introduction
------------

Web application to:

- give project leaders more insight into the data produced in their lab
- make it easier for researchers to find and access their data
- give data champions a means to identify datasets that need to be described
  with more metadata

High level user stories
-----------------------

- As a primary investigator I want to get an overview of the existing data,
  recently generated data, and trends in data, to give me confidence that data
  is managed properly by the members of my group so that I can sleep at night
- As a primary investigator I want to be able to find out where my data is
  stored to make responding to responsible science audits easier
- As a primary investigator I want to be able to find out if we already have
  whole RNASeq data for a particular plant line, and if so how many replicates
  were done in the experiment. More generally I want to be able to search by
  gene name and type of data (e.g. RNASeq).
- As a bioinformatician in a research group with lots of collaborations I want
  to be able to easily find data from old collaborations when collaborators get
  in touch years later. Further it would be useful to be able to copy and paste
  commands for accessing whole datasets and individual data items from the web
  interface to the terminal.


Red routes
----------

Data overview
^^^^^^^^^^^^^

Successful Susan is a primary investigator. She wants to find out if the latest
data has been stored safely or not.

Successful Susan logs into the system and at the top of the home page there is
a dashboard where she can see:

- A list of the ten most recently uploaded datasets and the date on which they
  were created and who created it
- The names of the storage locations she has access to and the number of
  datasets and total size of data in these, as well as a yearly cost estimate
  based on the current usage
- The names of the members in her group along with some stats (number of
  datasets, total size of datasets per person)
- A graph with trends in the number and size of data over time in the different
  storage locations

The dataset of interest is not one of the ten most recently uploaded datasets
so she a query to her bioinformatician Binary Beatrice to find out what state
the project and the data is in.

Data access
^^^^^^^^^^^

Binary Beatrice is a bioinformatician. She needs to redo an analysis from a
project called ``cancer-cure-42`` from nine months ago.  To do this she needs
access to her old data.

1. She clicks on the ``dtool-lookup-webapp`` bookmark in her web browser
2. She types the word ``cancer-cure-42`` into the search box and clicks the
   "Search" button
3. Three hits are listed in a table with administrative and summary metadata
4. When she clicks on a hit the descriptive metadata and a list of the items in
   the datasets is displayed
5. She wants to copy the entire raw data dateset so she clicks the "copy
   dataset" button, which copies the command to download the dataset into her
   clipboard, she then pastes the command into her terminal to download the
   dataset
6. From a derived dataset she wants to download a single BAM file, she
   therefore clicks the "copy item" button, which copies the command to fetch
   the specific item to her clipboard, she then pastes the command into her
   terminal to download the dataset item


Useful javacript libaries
-------------------------

- `Moment.js <http://momentjs.com/>`_ - Parse, validate, manipulate, and display dates and times in JavaScript.
- `axios <https://github.com/axios/axios>`_ - Promise based HTTP client for the browser and node.js
