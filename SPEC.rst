Draft Specification
===================

.. |date| date::

:Author: Tjelvar Olsson
:Date: |date|
:Status: Draft

Introduction
------------

Web application to:

- give project leaders more insight into the data produced in their lab
- to make it easier for researchers to find and access their data
- to give data champions a means to identify datasets that need to be described
  with more metadata

Red routes
----------

Data access
^^^^^^^^^^^

Binary Beatrice is a bioinformatician. She needs to redo an analysis from a
project called ``cancer-cure-42`` from nine months ago.  To do this she needs
access to her old data.

1. She clicks on the ``dtool-lookup-webapp`` link in her web browser
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
