create table Contacts(ContactID INT AUTO_INCREMENT, PrimaryPhone VARCHAR(12), HomePhone VARCHAR(12), 
CellPhone VARCHAR(12), Email VARCHAR(255), Address1 VARCHAR(50), Address2 VARCHAR(50), City VARCHAR(50), 
State VARCHAR(3), Zip VARCHAR(15), PRIMARY KEY(ContactID));

create table Staff(StaffID INT AUTO_INCREMENT, FirstName VARCHAR(40), LastName VARCHAR(40), DOB DATETIME, ContactID INT,
PRIMARY KEY(StaffID), FOREIGN KEY(ContactID) REFERENCES Contacts(ContactID));

create table Mentors(MentorID INT AUTO_INCREMENT, FirstName VARCHAR(40), LastName VARCHAR(40), DOB DATETIME, ContactID INT,
PRIMARY KEY(MentorID), FOREIGN KEY(ContactID) REFERENCES Contacts(ContactID));

create table Students(StudentID INT AUTO_INCREMENT, FirstName VARCHAR(40), LastName VARCHAR(40), 
DOB DATETIME, Grade INT, ContactID INT, MentorID INT, StaffID INT, PRIMARY KEY(StudentID), 
FOREIGN KEY(ContactID) REFERENCES Contacts(ContactID), FOREIGN KEY(MentorID) REFERENCES Mentors(MentorID), 
FOREIGN KEY(StaffID) REFERENCES Staff(StaffID));

create table Parents(ParentID INT AUTO_INCREMENT, FirstName VARCHAR(40), LastName VARCHAR(40), DOB DATETIME, ContactID INT, 
PRIMARY KEY(ParentID), FOREIGN KEY(ContactID) REFERENCES Contacts(ContactID));

create table StudentParent(StudentID INT, ParentID INT, PRIMARY KEY(StudentID, ParentID), FOREIGN KEY(StudentID) 
REFERENCES Students(StudentID), FOREIGN KEY(ParentID) REFERENCES Parents(ParentID));

create table Events(EventID INT AUTO_INCREMENT, EventName VARCHAR(40), EventDate DATETIME, Location VARCHAR(40), 
Address1 VARCHAR(50), Address2 VARCHAR(50), City VARCHAR(50), State VARCHAR(3), Zip VARCHAR(15), Description VARCHAR(255),
PRIMARY KEY(EventID));

create table EventAttendees(EventID INT, AttendeeID INT AUTO_INCREMENT, StaffID INT, MentorID INT, StudentID INT, 
ParentID INT, PRIMARY KEY(AttendeeID), FOREIGN KEY(EventID) REFERENCES Events(EventID), FOREIGN KEY(StaffID) 
REFERENCES Staff(StaffID), FOREIGN KEY(MentorID) REFERENCES Mentors(MentorID), FOREIGN KEY(StudentID) REFERENCES 
Students(StudentID), FOREIGN KEY(ParentID) REFERENCES Parents(ParentID));

create table Forums(ForumID INT AUTO_INCREMENT, ForumName VARCHAR(40), ForumDescription VARCHAR(255), ForumStartDate 
DATETIME, ForumEndDate DATETIME, PRIMARY KEY(ForumID));

create table ForumMembers(ForumID INT, MemberID INT AUTO_INCREMENT, StaffID INT, MentorID INT, StudentID INT, 
ParentID INT, PRIMARY KEY(MemberID), FOREIGN KEY(ForumID) REFERENCES Forums(ForumID), FOREIGN KEY(StaffID) 
REFERENCES Staff(StaffID), FOREIGN KEY(MentorID) REFERENCES Mentors(MentorID), FOREIGN KEY(StudentID) REFERENCES 
Students(StudentID), FOREIGN KEY(ParentID) REFERENCES Parents(ParentID));

create table ForumPosts(ForumID INT, MemberID INT, PostID INT AUTO_INCREMENT, ReplyToID INT, PostText VARCHAR(255), 
PostTime DATETIME, PRIMARY KEY(PostID), FOREIGN KEY(ForumID) REFERENCES Forums(ForumID), FOREIGN KEY(MemberID) 
REFERENCES ForumMembers(MemberID));

create table Timesheet(EventID INT, MentorID INT, hours Float, PRIMARY KEY(EventID, MentorID), FOREIGN 
KEY(EventID) REFERENCES Events(EventID), FOREIGN KEY(MentorID) REFERENCES Mentors(MentorID));



-- drop table eventattendees;
-- drop table timesheet;
-- drop table events;
-- drop table forumposts;
-- drop table forummembers;
-- drop table forums;
-- drop table studentparent;
-- drop table students;
-- drop table parents;
-- drop table staff;
-- drop table mentors;
-- drop table contacts;

show tables;


