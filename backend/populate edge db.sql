-- create 7 contact records for all the people,
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, City, State, Zip) values("9734459807","9734457865","9734459807","mikie_bonano@gmail.com","22 Elm Place", "Westfield", "NJ", "07893");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, Address2, City, State, Zip) values("2213359876","2213353376","2213359876","izzyjones@gmail.com","1230 Second Street","Apt 12","Bayonne","NJ","07002");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, City, State, Zip) values("9734451230","9734457865","9734451230","jbonano@yahoo.com","22 Elm Place", "Westfield", "NJ", "07893");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, City, State, Zip) values("9734456672","9734457865","9734456672","gillandjohnbonano@verizon.net","22 Elm Place", "Westfield", "NJ", "07893");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, Address2, City, State, Zip) values("2213357655","2213353376","2213357655","michellejones@hotmail.com","1230 Second Street","Apt 12","Bayonne","NJ","07002");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, City, State, Zip) values("5442379985","5442379985","5442379985","emilyevans@gmail.com","77 George Street", "Jackson", "NJ","08544");
Insert into Contacts(PrimaryPhone, HomePhone, CellPhone, Email, Address1, City, State, Zip) values("8776501822","8776501855","8776591822","juanjimenez3@xfinity.com","34 Maple Street","Highland Park","NJ","08755");
-- create 1 staff member and 1 mentor to supervise both children
Insert into Staff(FirstName, LastName, DOB, ContactID) values("Emily", "Evans", '1993-04-02',6);
Insert into Mentors(FirstName, LastName, DOB, ContactID) values("Juan", "Jimenez", '1997-11-07',7);
-- create 2 students one with 2 parents one with 1 parent
Insert into Students(FirstName, LastName, DOB,Grade, ContactID, MentorID, StaffID) values("Michael", "Bonano",'2005-02-18',11,1,1,1);
Insert into Students(FirstName, LastName, DOB,Grade, ContactID, MentorID, StaffID) values("Isobel", "Jones",'2005-07-22',11,2,1,1);
-- create said 3 parents
Insert into Parents(FirstName, LastName, DOB, ContactID) values("John", "Bonano", '1978-05-10',3);
Insert into Parents(FirstName, LastName, DOB, ContactID) values("Gillian", "Bonano", '1980-06-16',4);
Insert into Parents(FirstName, LastName, DOB, ContactID) values("Michelle", "Jones", '1982-03-17',5);
-- 3 barebones entries in studentparent table
Insert into StudentParent (StudentID, ParentID) values(1,1);
Insert into StudentParent (StudentID, ParentID) values(1,2);
Insert into StudentParent (StudentID, ParentID) values(2,3);
-- 1 event
Insert into Events(EventName, EventDate, Location, Address1, City, State, Zip, Description) values("Interview Preparation",'2022-05-11 10:00:00',"JKTC","44 Highland Ave","New Brunswick","NJ","34565","How to prepare yourself for job interviews, the do's and don'ts of jobs, and mock interviews.");
-- 4 eventattendees from 2 students and 1 staff and 1 mentor
Insert into EventAttendees(EventID, StudentID) values(1,1);
Insert into EventAttendees(EventID, StudentID) values(1,2);
Insert into EventAttendees(EventID, StaffID) values(1,1);
Insert into EventAttendees(EventID, MentorID) values(1,1);
-- 1 forum
Insert into Forums(ForumName, ForumDescription, ForumStartDate, ForumEndDate) values("Finding the Right College for You","Let's discuss what to look for when choosing a school",'2022-4-11 8:00:00','2022-4-15 23:59:00');
-- 4 forum members teachers + students
Insert into ForumMembers(ForumID, StudentID) values(1,1);
Insert into ForumMembers(ForumID, StudentID) values(1,2);
Insert into ForumMembers(ForumID, StaffID) values(1,1);
Insert into ForumMembers(ForumID, MentorID) values(1,1);
-- 2 forum posts 1 from each kid
Insert into ForumPosts (ForumID, MemberID, PostID, PostText, PostTime) values(1,1,1,"I want somewhere that's a fun place to be, as well as a decent business program.",'2022-4-12 22:37:00');
Insert into ForumPosts (ForumID, MemberID, PostID, PostText, PostTime) values(1,2,2,"I'd like to go somewhere that isn't too far from home, I'm also looking at schools with strong CS programs.",'2022-4-13 16:23:00');
-- timesheet for 1 mentor
Insert into Timesheet (EventID, MentorID, hours) values(1,1,5.5);
