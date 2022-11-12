select * from students;
select * from mentors;
select * from staff;
select * from parents;
select * from studentparent;
select * from contacts;

/*SELECT * from INFORMATION_SCHEMA.COLUMNS where
table_name = 'staff'*/

select s.studentID, s.FirstName as `Student First Name`, s.LastName as `Student Last Name`, s.DOB as `Date of Birth`, s.Grade, s.ContactID, c.PrimaryPhone, c.HomePhone, c.CellPhone, c.Email, c.Address1, c.Address2, c.City, c.State, c.Zip, s.MentorID, m.FirstName as `Mentor First Name`, m.LastName as `Mentor Last Name`, s.StaffID, sf.FirstName as `Staff First Name`, sf.LastName as `Staff Last Name` from students s left join contacts c on s.ContactID = c.ContactID left join mentors m on s.MentorID = m.MentorID left join staff sf on s.StaffID = sf.StaffID;
select sp.studentID, sp.ParentID, p.FirstName as `Parent First Name`, p.LastName as `ParentLastName`, p.ContactID, c.PrimaryPhone, c.HomePhone, c.CellPhone, c.Email, c.Address1, c.Address2, c.City, c.State, c.Zip from studentparent sp left join parents p on sp.ParentID = p.ParentID left join contacts c on p.ContactID = c.ContactID;

-- to do attempt to flatten to parent rows if can't get it to work then just do two rows approach





select sp.studentID, s.FirstName as `Student First Name`, s.LastName as `Student Last Name`, s.DOB as `Date of Birth`, s.Grade, 
s.MentorID, m.FirstName as `Mentor First Name`, m.LastName as `Mentor Last Name`, s.StaffID, sf.FirstName as `Staff First Name`, sf.LastName as `Staff Last Name`, 
s.ContactID, c.PrimaryPhone, c.HomePhone, c.CellPhone, c.Email, c.Address1, c.Address2, c.City, c.State, c.Zip,
sp.Parent1ID, p1.FirstName as `Parent First Name`, p1.LastName as `Parent Last Name`, p1.ContactID, pc1.PrimaryPhone, pc1.HomePhone, pc1.CellPhone, pc1.Email, pc1.Address1, pc1.Address2, pc1.City, pc1.State, pc1.Zip, 
sp.Parent2ID,  p2.FirstName as `Parent First Name`, p2.LastName as `Parent Last Name`, p2.ContactID, pc2.PrimaryPhone, pc2.HomePhone, pc2.CellPhone, pc2.Email, pc2.Address1, pc2.Address2, pc2.City, pc2.State, pc2.Zip
FROM (SELECT s1.studentID, max(CASE WHEN s1.rn = 1 THEN s1.parentID END ) As Parent1ID, max(CASE WHEN s1.rn = 2 THEN s1.parentID END ) as Parent2ID 
FROM ( SELECT t1.studentID, t1.parentID, @RN:=CASE WHEN @sid=studentID THEN @rn+1 ELSE 1 END as rn,
@sid:=studentID as sid FROM studentparent t1, (SELECT @rn:=0,@sid:='') as t
ORDER BY t1.studentID
) s1 
GROUP BY s1.studentID
ORDER BY s1.studentID) sp left join students s on s.studentID = sp.studentID 
left join contacts c on s.ContactID = c.ContactID left join mentors m on s.MentorID = m.MentorID left join staff sf on s.StaffID = sf.StaffID
left join parents p1 on sp.Parent1ID = p1.parentID left join contacts pc1 on p1.contactID = pc1.ContactID 
left join parents p2 on sp.Parent2ID = p2.parentID left join contacts pc2 on p2.contactID = pc2.ContactID
