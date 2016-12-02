# File Size Pipe

Complete the implemtnation of the _*src/filesize-pipe.ts*_

**Expected Results**:

Formats a filesize for readability. The input is passed in bytes (B).

Quick reference:

- 1024^0 Bytes = 1 Byte (B)
- 1024^1 Bytes = 1 Kilobyte (KB)
- 1024^2 Bytes = 1 Megabyte (MB)
- 1024^3 Bytes = 1 Gigabyte (GB)
- 1024^4 Bytes = 1 Terabyte (TB)
- 1024^5 Bytes = 1 Perabyte (PB)
...

File size is: {{ 1024^4 | fileSize }}
=
File size is: 1.00 TB

Next, try adding an aditional boolean parameter where, if true, writes the unit in long form

File size is: {{ 1024^4 | fileSize }}
=
File size is: 1.00 Terabytes
