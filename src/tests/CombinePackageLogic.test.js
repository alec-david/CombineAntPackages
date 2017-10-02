import { combineSelectedPackages } from '../utils/CombinePackagesLogic';

describe('Combine Packages', () => {
  it('Combine no packages, should return empty pacakge', () => {
    expect.assertions(1);
    return combineSelectedPackages([]).then(data => {
      expect(data).toMatchSnapshot();
    });
  });

  const file1 = generateFile(1);
  it('Combine 1 package, package should not change', () => {
    expect.assertions(1);
    return combineSelectedPackages([file1]).then(data => {
      expect(data).toMatchSnapshot();
    });
  });

  const file2 = generateFile(2);
  it('Combine 2 packages, packages should combine with no repeats', () => {
    expect.assertions(1);
    return combineSelectedPackages([file1, file2]).then(data => {
      expect(data).toMatchSnapshot();
    });
  });

  const file3 = generateFile(3);
  it('Combine 3 packages, packages should combine with no repeats', () => {
    expect.assertions(1);
    return combineSelectedPackages([file1, file2, file3]).then(data => {
      expect(data).toMatchSnapshot();
    });
  });
});

function generateFile(num) {
  return new File([generateBlobFromString(num)], 'package' + num + '.xml');
}

function generateBlobFromString(num) {
  return new Blob([getPackageString(num)], {
    type: 'text/xml'
  });
}

function getPackageString(num) {
  if (num === 1) {
    return getPackageOne();
  } else if (num === 2) {
    return getPackageTwo();
  } else {
    return getBlankPackage();
  }
}

function getPackageOne() {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <Package xmlns="http://soap.sforce.com/2006/04/metadata">
        <types>
            <members>VIEWS_CaseAttachmentTabController</members>
            <members>VIEWS_CaseAttachmentTabControllerTest</members>
            <members>VIEWS_CongressionalCaseMail_E2C</members>
            <members>VIEWS_CongressionalCaseMail_E2CTest</members>
            <members>VIEWS_CreateRFICaseFromEmail</members>
            <members>VIEWS_FlowController</members>
            <members>VIEWS_FlowControllerTest</members>
            <members>VIEWS_MockHttpResponseGenerator</members>
            <members>VIEWS_ScheduleBusinessDaystoDueDate</members>
            <members>VIEWS_ScheduleBusinessDaystoDueDateTest</members>
            <members>VIEWS_UpdateBusinessDaystoDueDate</members>
            <members>VIEWS_UpdateBusinessDaystoDueDateTest</members>
            <members>ViewsEmailServiceUtility</members>
            <members>ViewsUploadAttachmentController</members>
            <members>ViewsUploadAttachmentControllerTest</members>
            <members>Views_SMEResponseHandler</members>
            <name>ApexClass</name>
        </types>
        <types>
            <members>VIEWS_AddCaseTeamFlowComponent</members>
            <members>VIEWS_AssignCaseTasksFlowComponent</members>
            <name>ApexComponent</name>
        </types>
        <types>
            <members>VIEWS_AddCaseTeamFlow</members>
            <members>VIEWS_AssignCaseTasksFlow</members>
            <name>ApexPage</name>
        </types>
        <types>
            <members>Case.CareNow Assignment Rule</members>
            <name>AssignmentRule</name>
        </types>
        <types>
            <members>VIEWS_CaseAttachmentRelatedTabComponent</members>
            <members>ViewsUploadAttachmentComponent</members>
            <name>AuraDefinitionBundle</name>
        </types>
        <types>
            <members>Case.Congressional_Compact_Layout</members>
            <members>VIEWS_Contact_Roles__c.VIEWS_ContactRoles_Compact_Layout</members>
            <name>CompactLayout</name>
        </types>
        <types>
            <members>VA_VIEWS</members>
            <name>CustomApplication</name>
        </types>
        <types>
            <members>Case.Created_By_User_s_Office__c</members>
            <members>Case.VIEWS_Allow_Case_Closure__c</members>
            <members>Case.VIEWS_Business_Days_to_Due_Date__c</members>
            <members>Case.VIEWS_Committee_Name__c</members>
            <members>Case.VIEWS_Committee_Request__c</members>
            <members>Case.VIEWS_Committee_Request__c</members>
            <members>Case.VIEWS_Days_Under_or_Past_Due__c</members>
            <members>Case.VIEWS_Dispatch_Delivery_Date__c</members>
            <members>Case.VIEWS_FolderHandlerLookup__c</members>
            <members>Case.VIEWS_FolderHandlerLookup__c</members>
            <members>Case.VIEWS_Folder_Due_Date__c</members>
            <members>Case.VIEWS_Number_of_Primary_Staffers__c</members>
            <members>Case.VIEWS_Primary_MOC__c</members>
            <members>Case.VIEWS_Primary_MOC__c</members>
            <members>Case.VIEWS_Signature_Document_Date__c</members>
            <members>Case.VIEWS_Status_meter__c</members>
            <members>Case.Views_Case_Category__c</members>
            <members>Case.Views_Case_Type__c</members>
            <members>Case.Views_Document_Type__c</members>
            <members>VIEWS_Case_Email__c.BCC_Address__c</members>
            <members>VIEWS_Case_Email__c.Body__c</members>
            <members>VIEWS_Case_Email__c.CC_Address__c</members>
            <members>VIEWS_Case_Email__c.Case__c</members>
            <members>VIEWS_Case_Email__c.Recipients__c</members>
            <members>VIEWS_Case_Email__c.Sender_Name__c</members>
            <members>VIEWS_Case_Email__c.Sender__c</members>
            <members>VIEWS_Case_Email__c.Subject__c</members>
            <members>VIEWS_Case_Note__c.Body__c</members>
            <members>VIEWS_Case_Note__c.Case__c</members>
            <members>VIEWS_Case_Note__c.Title__c</members>
            <members>Views_Associated_Contacts__c.AC_Case_Type__c</members>
            <members>Views_Associated_Contacts__c.VIEWS_Case_Subject__c</members>
            <members>Views_Associated_Contacts__c.Views_Role__c</members>
            <members>Views_Case_Tasks__c.Clearance_Review_Required__c</members>
            <members>Views_Case_Tasks__c.Incorrect_Response__c</members>
            <members>Views_Case_Tasks__c.Owner_Name__c</members>
            <members>Views_Case_Tasks__c.Reason_Why_Incorrect__c</members>
            <members>Views_Case_Tasks__c.Responsible_Organization__c</members>
            <members>Views_Case_Tasks__c.Status__c</members>
            <members>Views_Case_Tasks__c.VIEWSLL_Auth_Signer__c</members>
            <members>Views_Case_Tasks__c.VIEWS_AuthSignerName__c</members>
            <members>Views_Case_Tasks__c.VIEWS_Case_Task_Type__c</members>
            <name>CustomField</name>
        </types>
        <types>
            <members>VIEWS_Case_Email__c</members>
            <members>VIEWS_Case_Note__c</members>
            <members>VIEWS_Contact_Roles__c</members>
            <members>VIEWS_Related_Cases__c</members>
            <name>CustomObject</name>
        </types>
        <types>
            <members>VIEWS_Case_Email__c</members>
            <members>VIEWS_Case_Note__c</members>
            <members>VIEWS_Contact_Roles__c</members>
            <members>VIEWS_Related_Cases__c</members>
            <name>CustomTab</name>
        </types>
        <types>
            <members>VIEWS_Dashboards/Congressional_Case_Dashboard</members>
            <name>Dashboard</name>
        </types>
        <types>
            <members>VIEWS_Manual_Templates</members>
            <members>VIEWS_Manual_Templates/VIEWS_Notify_Case_Team_Members_on_Case_Task_Response</members>
            <members>VIEWS_Manual_Templates/VIEWS_RFI_Collated_Cleared_Response</members>
            <members>Views</members>
            <members>Views/Case_Task_Reassignment</members>
            <members>Views/RFI_Case_Task_Closed_Notification</members>
            <members>Views/Reassignment_Notes_Entered</members>
            <members>Views/VIEWS_Case_Mail_Misc_Case_Task_Owner_Change_Notification</members>
            <members>Views/VIEWS_Case_Task_Assignment_Notification</members>
            <members>Views/VIEWS_Case_Task_Reassignment_RFI</members>
            <members>Views/VIEWS_Default_Email_Template</members>
            <members>Views/VIEWS_RFI_Case_Closed_Notification</members>
            <members>Views/VIEWS_RFI_Program_Office_New_Case_Task</members>
            <members>Views/VIEWS_RFI_Staffer_Acknowledgement</members>
            <members>Views/Views_Case_Status_Change</members>
            <name>EmailTemplate</name>
        </types>
        <types>
            <members>VAViews_CasePageLayout</members>
            <members>VA_VIEWS_UtilityBar</members>
            <members>VIEWS_CaseAttachmentLP</members>
            <members>VIEWS_Case_Email_FlexiPage</members>
            <members>VIEWS_Case_Note_FlexiPage</members>
            <members>VIEWS_Congressional_Correspondance</members>
            <name>FlexiPage</name>
        </types>
        <types>
            <members>SME_Liaison_Task_Reassignment-34</members>
            <members>VIEWS_Add_Case_Team_to_Case-47</members>
            <members>VIEWS_Case_Attachment_Created-1</members>
            <members>VIEWS_Case_Note_Created-1</members>
            <members>VIEWS_Case_Sensitivity_Change-4</members>
            <members>VIEWS_Case_Task_Created-1</members>
            <members>VIEWS_Case_Team_Created-1</members>
            <members>VIEWS_Contact_Role_object_updates-1</members>
            <members>VIEWS_Convert_Incoming_Email_to_Case_Email-14</members>
            <members>VIEWS_Create_Case_Attachment_Sharing_Rules-8</members>
            <members>VIEWS_Create_Case_Email_Sharing_Rules-8</members>
            <members>VIEWS_Create_Case_Note_Sharing_Rules-9</members>
            <members>VIEWS_Create_Case_Task_Sharing_Rules-12</members>
            <members>VIEWS_Create_Case_Team_Sharing_Rules-10</members>
            <members>VIEWS_Create_SME_Tasks-122</members>
            <members>VIEWS_Delete_Existing_Case_Related_Object_Sharing_Rules-3</members>
            <members>VIEWS_Email_Conversion-2</members>
            <members>VIEWS_Prevent_Case_Closure_When_Related_Tasks_are_Open-6</members>
            <members>VIEWS_RFI_Correspondence-4</members>
            <members>VIEWS_Related_Cases_Update-9</members>
            <members>VIEWS_Remove_Case_Team_Member-19</members>
            <members>VIEWS_Remove_Case_Team_Member-22</members>
            <members>VIEWS_Remove_Case_Team_Member-9</members>
            <members>VIEWS_Set_Congressional_Case_Due_Date-5</members>
            <members>VIEWS_Set_Congressional_Case_Due_Date_PB-9</members>
            <members>VIEWS_Set_Executive_Correspondence_Case_Due_Date-2</members>
            <members>VIEWS_Set_Generic_Case_Due_Date-1</members>
            <members>Views_Related_Case_Creation-4</members>
            <name>Flow</name>
        </types>
        <types>
            <members>VBAChiefOfStaff</members>
            <name>Group</name>
        </types>
        <types>
            <members>Case-CongressionalLetters</members>
            <members>Case-Executive Correspondence Misc Case Mail</members>
            <members>Case-RFI Congressional Correspondence</members>
            <members>Case-VIEWS Congressional Case Mail</members>
            <members>Case-VIEWS Generic Congressional Correspondence</members>
            <members>Contact-Congressional Letters Layout</members>
            <members>Contact-Congressional Letters Layout</members>
            <members>VIEWS_Case_Email__c-Case Email Layout</members>
            <members>VIEWS_Case_Note__c-Case Note Layout</members>
            <members>VIEWS_Contact_Roles__c-VIEWS Contact Role Layout</members>
            <members>VIEWS_Related_Cases__c-Related Case Layout</members>
            <members>Views_Case_Attachment__c-Case Attachment Layout</members>
            <members>Views_Case_Tasks__c-Case Tasks Layout</members>
            <members>Views_Case_Team__c-Case Team Layout</members>
            <name>Layout</name>
        </types>
        <types>
            <members>Case.OCLA_My_Cases</members>
            <members>Case.VIEWS_Open_RFI_Requests</members>
            <members>Case.Views_Exec_Corr_Case</members>
            <members>Case.Views_OCLA_Case</members>
            <members>Case.Views_Open_Congressional_Letters</members>
            <members>Views_Case_Tasks__c.ExecCorr_Case_Task_Overdue</members>
            <members>Views_Case_Tasks__c.RFI_Case_Tasks</members>
            <members>Views_Case_Tasks__c.VIEWS_Clearing_Official_View</members>
            <members>Views_Case_Tasks__c.VIEWS_OCLA_Case_Task</members>
            <members>Views_Case_Tasks__c.Views_My_Open_Tasks</members>
            <name>ListView</name>
        </types>
        <types>
            <members>Contact.VIEWS_Check_for_Staffer_duplicate_Contact_matching_rule</members>
            <name>MatchingRule</name>
        </types>
        <types>
            <members>ExecSec_User</members>
            <members>VIEWSExternalSMEs</members>
            <members>VIEWS_Executive_Correspondence</members>
            <members>VIEWS_OCLA_Permission_Set</members>
            <members>VIEWS_SME_Organizations_Executive_Correspondence</members>
            <members>Views_Liaison_SME_User</members>
            <name>PermissionSet</name>
        </types>
        <types>
            <members>Views Congressional Letter</members>
            <name>Profile</name>
        </types>
        <types>
            <members>Views_Case_Tasks__c.Incorrect_Response</members>
            <name>QuickAction</name>
        </types>
        <types>
            <members>Case.VIEWS_Executive_Correspondence_Misc_Case_Mail</members>
            <members>Case.VIEWS_RFI</members>
            <name>RecordType</name>
        </types>
        <types>
            <members>VIEWS</members>
            <members>VIEWS/Exec_Corr_Case_Tasks_by_Organization</members>
            <members>VIEWS/Exec_Corr_Mgr_s_Report_on_Open_Cases</members>
            <members>VIEWS/Executive_Correspondence_Cases_by_Owner</members>
            <members>VIEWS/Misc_Case_Mail_Case_Task_15_days_overdue</members>
            <members>VIEWS/Open_Exec_Corr_Cases_and_Tasks</members>
            <members>VIEWS/RFI_6_PM_Notification</members>
            <members>VIEWS/VIEWS_Case_Task_Incorrect_Responses</members>
            <members>VIEWS/VIEWS_Congressional_Letters_CLOSED_Cases</members>
            <members>VIEWS/VIEWS_Open_Congressional_Letters</members>
            <members>VIEWS/VIEWS_ProgOffice_CT_Responses</members>
            <members>VIEWS/VIEWS_RFI_Case_Resolution_Time</members>
            <members>VIEWS/VIEWS_RFI_Cases_with_MOC_Staffer</members>
            <members>VIEWS/Views_Cases_By_Type</members>
            <name>Report</name>
        </types>
        <types>
            <members>Count_of_Incorrect_Response_Tasks</members>
            <name>ReportType</name>
        </types>
        <types>
            <members>Case.VIEWS_Exec_Correspondence_Sharing</members>
            <members>Case.VIEWS_OCLA_Case_Read_Write_LEAN</members>
            <members>Case.VIEWS_OCLA_Case_Read_Write_RFI</members>
            <members>Case.Views_Rule</members>
            <name>SharingCriteriaRule</name>
        </types>
        <types>
            <members>VIEWS_Bootstrap</members>
            <members>VIEWS_DatePicker</members>
            <members>VIEWS_jQuery</members>
            <name>StaticResource</name>
        </types>
        <types>
            <members>Case.VIEWS_Case_Comments_Required</members>
            <members>Case.VIEWS_Delivery_Date_Must_be_Populated</members>
            <members>Case.VIEWS_Exec_Corr_Account_Req</members>
            <members>Case.VIEWS_Prevent_Manual_Case_Closure</members>
            <members>Case.VIEWS_Received_Date_Before_Document_Date</members>
            <members>Case.VIEWS_Select_Folder_Handler</members>
            <members>Case.Views_Primary_MOC_Required</members>
            <members>Views_Associated_Contacts__c.Views_Primary_Staffer_Greater_Than_One</members>
            <members>Views_Case_Tasks__c.VIEWS_Clearance_Review_Required</members>
            <members>Views_Case_Tasks__c.Views_Set_Authorized_Signer</members>
            <name>ValidationRule</name>
        </types>
        <types>
            <members>Case.VIEWS_Close_Case</members>
            <name>WebLink</name>
        </types>
        <types>
            <members>Views_Case_Team__c.Delete_Case_Teams</members>
            <name>WebLink</name>
        </types>
        <types>
            <members>VIEWS_Related_Cases__c</members>
            <members>Views_Case_Team__c</members>
            <name>Workflow</name>
        </types>
        <types>
            <members>Case.VIEWS_A_Case_Has_Been_Reassigned_Notification_to_Parent_Case_Owner</members>
            <members>Case.VIEWS_Collated_Response_Notification_to_OCLA</members>
            <members>Case.VIEWS_RFI_Case_Closure_Case_Team_Notification</members>
            <members>Views_Associated_Contacts__c.VIEWS_RFI_Send_Staffer_Acknowledgement</members>
            <members>Views_Case_Tasks__c.Case_Task_Reassignment_LEAN</members>
            <members>Views_Case_Tasks__c.Send_Email_to_Case_Owner</members>
            <members>Views_Case_Tasks__c.VIEWS_Case_Task_Reassignment_Notification_to_Clearing_Official</members>
            <members>Views_Case_Tasks__c.VIEWS_Case_Task_Reassignment_Notification_to_Program_Office</members>
            <members>Views_Case_Tasks__c.VIEWS_Notify_Executive_Correspondence_Case_Mail_Misc_Case_Owner_on_Case_Task_Own</members>
            <members>Views_Case_Tasks__c.VIEWS_RFI_New_Case_Tasks_Assigned</members>
            <members>Views_Case_Tasks__c.VIEWS_RFI_Reassignment_Notes_Have_Been_Entered</members>
            <members>Views_Case_Tasks__c.VIEWS_Send_Email_Alert_to_Case_Task_Owner_upon_Case_Mail_Misc_Task_Assignment</members>
            <name>WorkflowAlert</name>
        </types>
        <types>
            <members>Views_Case_Tasks__c.VIEWS_Set_Case_Task_Responsible_Org</members>
            <name>WorkflowFieldUpdate</name>
        </types>
        <types>
            <members>Case.VIEWS_Collated_Response_Available_RFI</members>
            <members>Case.VIEWS_RFI_Case_Closed_Case_Team_Notification</members>
            <members>Views_Associated_Contacts__c.Send RFI Acknowledgement to Staffer</members>
            <members>Views_Associated_Contacts__c.Update Case Primary MOC</members>
            <members>Views_Case_Tasks__c.VIEWS Case Mail Misc Case Task Assignment Notification</members>
            <members>Views_Case_Tasks__c.VIEWS Send Notification to Case Owner on RFI Case Task Completion</members>
            <members>Views_Case_Tasks__c.VIEWS Set Case Task Responsible Org</members>
            <members>Views_Case_Tasks__c.VIEWS_RFI_New_Case_Task</members>
            <name>WorkflowRule</name>
        </types>
        <version>40.0</version>
    </Package>
    `;
}

function getPackageTwo() {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <Package xmlns="http://soap.sforce.com/2006/04/metadata">
        <types>
            <members>VIEWS_React</members>
            <name>StaticResource</name>
        </types>
        <types>
            <members>SME_Liaison_Task_Reassignment-36</members>
            <members>VIEWS_Add_Case_Team_to_Case-45</members>
            <members>Views_Related_Case_Creation-4</members>
            <members>Views_Related_Case_Creation-14</members>
            <members>Views_Related_Case_Creation-24</members>
            <name>Flow</name>
        </types>
        <version>40.0</version>
    </Package>
    `;
}

function getBlankPackage() {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <version>40.0</version>
</Package>`;
}
