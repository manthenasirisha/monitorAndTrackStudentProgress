------------------------------------------------------------------------------------------------------------------------
Technologies: HTML/CSS/JavaScript,bootstrap,jquery,,Node Js,express js,and MySqL database.
------------------------------------------------------------------------------------------------------------------------
Required Software:

1) XAMPP Server 
    -- Here is the link to download https://sourceforge.net/projects/xampp/
    -- The following will be used for this project  
        -- Apache Web Server to host the html/css/js files
        -- Mysql database
2) NODEJS
    -- Download nodejs from the below link
    -- https://nodejs.org/en/download/
3) Intellij IDE work on the project
    -- Download Intellij IDE from the below link
    -- https://www.jetbrains.com/idea/download/    

------------------------------------------------------------------------------------------------------------------------     
Steps to  install :

1) Run the database scripts on the XAMPP MYSQL SERVER
    a) Run the data definition scripts on the mysqlserver from monitor-student-performance-schema.sql
    b) Run the data manipulation scripts on the mysqlserver from monitor-student-performance-dataload.sql
2) Run the 'npm  install' from project root directory 
       example: C:\Users\psrvarma\Desktop\university\project\monitorAndTrackStudentProgress
3) Run 'npm start' from directory server directory of the project
       example: from C:\Users\psrvarma\Desktop\university\project\monitorAndTrackStudentProgress\server
4) Copy the html, js and css files from ui directory into the <XAMPP-ROOT-DIR>\htdocs\monitorAndTrackStudentProgress folder
       example: C:\xampp\htdocs\monitorAndTrackStudentProgress
5) access the resource using http://localhost/monitorAndTrackStudentProgress/students.html

------------------------------------------------------------------------------------------------------------------------