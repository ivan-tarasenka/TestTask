import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a project page
 */
class ProjectPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get btnCreateNewProject () {
        return $('aria/Create new project');
    }

    public get inputNewProjectName () {
        return $('#project-name');
    }

    public get inputNewProjectCode () {
        return $('#project-code');
    }

    public get inputNewDescriptionProject () {
        return $('//*[@id="description-area"]');
    }

    public get btnCreateProject () {
        return $('//html/body/div[1]/div/div[2]/dialog/div/div[2]/form/div[2]/ui-reset[2]/button');
    }

    public get btnCancelProject () {
        return $('/html/body/div[1]/div/div[2]/dialog/div/div[2]/form/div[2]/ui-reset[1]/button');
    }
    
    public get btnCreateCase () {
        return $('#create-case-button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to create project
     * @param projectName name project
     * @param projectCode code project
     * @param projectDescription description project
     */
    public async createNewProject(projectName: string, projectCode: string, projectDescription: string) {
        await this.inputNewProjectName.setValue(projectName)
        await this.inputNewProjectCode.setValue(projectCode)
        await this.inputNewDescriptionProject.setValue(projectDescription)
        await this.btnCreateProject.click()
    }

}

module.exports = new ProjectPage();
