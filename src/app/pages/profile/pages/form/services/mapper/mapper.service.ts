import { Injectable } from '@angular/core';
import { Item } from '@app/models/client';
import { Dictionaries } from '@app/store/dictionaries';
import { Employee, Recruiter, User, UserCreateRequest } from '@app/store/user';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';
import { ProfileForm } from '../../pages/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  constructor() {}

  public userToForm(user: User): ProfileForm {
    const { name, photoURL, country, about, roleId } = user;
    return {
      personal: {
        name: user ? name : null,
        photoURL: user ? photoURL : null,
        country: user ? country : null,
      },
      professional: {
        about: user ? about : null,
        roleId: user ? roleId : null,
        role: user ? this.getFormRole(user) : null,
      },
    };
  }

  public formToUserCreate(
    form: ProfileForm | any,
    dictionaries: Dictionaries
  ): UserCreateRequest {
    const { name, photoURL, country } = form.personal;
    const { roleId, about } = form.professional;

    return {
      name: name || null,
      photoURL: photoURL || null,
      roleId: roleId || null,
      country: country || null,
      about,
      role: this.getRole(form, dictionaries),
    };
  }

  public formToUserUpdate(
    form: ProfileForm,
    user: User,
    dictionaries: Dictionaries
  ): User {
    const { uid, email, created } = user;
    const { name, photoURL, country } = form.personal;
    const { roleId, about } = form.professional;

    return {
      uid,
      email,
      created,
      name: name || null,
      photoURL: photoURL || null,
      roleId,
      country: country || null,
      about,
      role: this.getRole(form, dictionaries),
    };
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | null {
    if (user.roleId === 'employee') {
      const {
        expectedSalary,
        specialization,
        qualification,
        skills,
        experiences,
      } = user.role as Employee;
      const formRole: EmployeeForm = {
        expectedSalary,
        specialization: specialization ? specialization.id : null,
        qualification: qualification ? qualification.id : null,
        skills: skills.map((skill: any): any => skill.id),
        experiences,
      };

      return formRole;
    }

    if (user.roleId === 'recruiter') {
      const { companyName, employeesCount } = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName,
        employeesCount,
        experiences: [],
      };

      return formRole;
    }

    return null;
  }

  private getRole(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): Employee | Recruiter | null {
    if (form && form.professional?.roleId === 'employee') {
      const formRole: EmployeeForm = form.professional.role as EmployeeForm;
      const { expectedSalary, specialization, qualification, experiences } =
        formRole;
      const { specializations, qualifications, skills } = dictionaries;
      const role: Employee = {
        expectedSalary,
        specialization:
          specializations.items.find(
            (item: Item): boolean => item.id === specialization
          ) || null,
        qualification:
          qualifications.items.find(
            (item: Item): boolean => item.id === qualification
          ) || null,
        skills: formRole.skills.map((skill: string): Item | undefined =>
          skills.items.find((item: Item): boolean => item.id === skill)
        ),
        experiences,
      };

      return role;
    }

    if (form && form.professional?.roleId === 'recruiter') {
      const { companyName, employeesCount } = form.professional
        .role as RecruiterForm;
      const role: Recruiter = {
        companyName,
        employeesCount,
      };

      return role;
    }

    return null;
  }
}
