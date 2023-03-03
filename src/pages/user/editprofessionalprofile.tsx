import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/EditProfessionalProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'

export default function EditProfessionalProfile () {

    const session = useRequireAuth();
    if (!session) return <div>Loading...</div>
    else {
        // Logic to enable inputs based on checkboxes (CLT and PJ salary)
        const cltCheckbox = (document.getElementById("CLT")as HTMLInputElement);
        const pjCheckbox = (document.getElementById("PJ") as HTMLInputElement);
        const salaryCltInput = (document.getElementById("salaryclt") as HTMLInputElement);
        const salaryPjInput = (document.getElementById("salarypj") as HTMLInputElement);

        if(cltCheckbox && salaryCltInput) cltCheckbox.addEventListener("click", () => {
            salaryCltInput.disabled = !cltCheckbox.checked;
        });
        
        if(pjCheckbox && salaryPjInput) pjCheckbox.addEventListener("click", () => {
            salaryPjInput.disabled = !pjCheckbox.checked;
        });

        // Logic to add new tools to the list
        const addToolButton = (document.getElementById("addToolButton") as HTMLInputElement);
        const toolsArea = (document.getElementById("toolsArea") as HTMLInputElement);
        const newToolName = (document.getElementById("newToolName") as HTMLInputElement);

        
        if(addToolButton && toolsArea) {
            const addToolHandler = () => {
                addToolButton.removeEventListener("click", addToolHandler);

                if( newToolName.value === "") return;

                const newTool = document.createElement("div");
                newTool.className = styles.singleTool;
                newTool.innerHTML = `
                    <span>${newToolName.value}</span>
                    <span class=${styles.deleteButton}>x</span>
                `;

                toolsArea.appendChild(newTool);

                newToolName.value = "";
                addToolButton.addEventListener("click", addToolHandler);
            }
            addToolButton.addEventListener("click", addToolHandler);
        }

        // Logic to delete tools from the list
        if(toolsArea) {
            toolsArea.addEventListener("click", (event) => {
                const target = event.target as HTMLInputElement;
                if(target.className === styles.deleteButton) {
                    target.parentElement?.remove();
                }
            });
        }

        // Logic to add new experiences to the list
        const addExperienceButton = (document.getElementById("addExperienceButton") as HTMLInputElement);
        const experiencesHolder = (document.getElementById("experiencesHolder") as HTMLInputElement);
        const allExperiences = (document.getElementsByClassName(styles.experienceArea) as HTMLCollectionOf<HTMLElement>);
        

        if(addExperienceButton && experiencesHolder) {
            const addExperienceHandler = () => {
                const newExperience = document.createElement("div");
                newExperience.className = styles.experienceArea;
                newExperience.innerHTML = `
                    <div class=${styles.formLine}>
                        <span class=${styles.inputSpan}>
                            <input type="text" name="position" placeholder="Position" />
                        </span>
                        <span class=${styles.inputSpan}>
                            <input type="text" name="company" placeholder="Company" />
                        </span>
                    </div>

                    <div class=${styles.formLine}><div class=${styles.formLine}>
                        <span class=${[styles.inputSpan, styles.inputSpanEntireLine].join(" ")}>
                            <input type="date" name="startdate" placeholder="Start Date" />
                        </span>
                        <span class=${[styles.inputSpan, styles.inputSpanEntireLine].join(" ")}>
                            <input type="date" name="enddate" placeholder="End Date" disabled />
                        </span>
                        <span style="display: flex; flex-direction: row; width: 100%; padding: 0px 10px;">
                            <input type="checkbox" name="currentjob" value="currentjob" />
                            <label htmlFor="currentjob" style="margin-left: 5px; font-size: 0.8rem;">Current Job</label>
                        </span>
                    </div></div>

                    <div class=${styles.formLine}>
                        <span class="${styles.inputSpan} ${styles.inputSpanEntireLine}">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols=${30} rows=${10}></textarea>
                        </span>
                    </div>

                    <div class=${styles.formLine}>
                        <button type="button" class="${styles.removeExperienceButton} ${styles.addButton}">Delete</button>
                    </div>
                `;
                
                
                const lastExperienceDescription = (allExperiences[allExperiences.length - 1]?.children[2]?.lastElementChild?.lastElementChild as HTMLInputElement);
                if(lastExperienceDescription?.value !== "" && lastExperienceDescription?.value !== undefined || allExperiences.length === 0) {
                    (newExperience?.children[1]?.lastElementChild?.children[1]?.lastElementChild as HTMLInputElement).disabled = false;
                    experiencesHolder.appendChild(newExperience);
                }
            }
            addExperienceButton.removeEventListener("click", addExperienceHandler);
            addExperienceButton.addEventListener("click", addExperienceHandler);
        }

        // Logic to delete experiences from the list
        if(experiencesHolder) {
            experiencesHolder.addEventListener("click", (event) => {
                const target = event.target as HTMLInputElement;
                if(target.className.includes(styles.removeExperienceButton)) {
                    target.parentElement?.parentElement?.remove();
                }
            });
        }

        // Logic to block end date input if current job is checked
        if(experiencesHolder) {
            experiencesHolder.addEventListener("click", (event) => {
                const target = event.target as HTMLInputElement;
                if(target.name === "currentjob") {
                    const endDateInput = target.parentElement?.parentElement?.children[1].lastElementChild as HTMLInputElement;
                    endDateInput.disabled = target.checked;
                    
                    const allCurrentJobCheckboxes = (document.getElementsByName("currentjob") as NodeListOf<HTMLInputElement>);
                    allCurrentJobCheckboxes.forEach(checkbox => {
                        if(checkbox !== target) {
                            checkbox.checked = false;
                            const endDateInput = checkbox.parentElement?.parentElement?.children[1].lastElementChild as HTMLInputElement;
                            endDateInput.disabled = false;
                        }
                    });
                }
            });
        }

        // Logic to block two currentjob checkboxes at the same time
        if(experiencesHolder) {
            experiencesHolder.addEventListener("click", (event) => {
                const target = event.target as HTMLInputElement;
                if(target.name === "currentjob") {
                    const allCurrentJobCheckboxes = (document.getElementsByName("currentjob") as NodeListOf<HTMLInputElement>);
                    allCurrentJobCheckboxes.forEach(checkbox => {
                        if(checkbox !== target) checkbox.checked = false;
                    });
                }
            });
        }

        // Logic to handle Submit button
        const submitButton = (document.getElementById("submitButton") as HTMLInputElement);
        if(submitButton) {
            submitButton.addEventListener("click", (event) => {
                event.preventDefault();
                console.log("OK")
            });
        }
    }

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={styles.companyLogo}>
                            <Image src="https://github.com/AllanCFE.png" alt="Company Logo" width={200} height={200} />
                        </span>
                        <span>
                            <h2>Allan Echeverria</h2>
                        </span>
                        <span>
                            <p className={styles.lastUpdated}>Last updated: 2022/02/28</p>
                        </span>
                    </div>

                </>
            }

            leftClass={styles.leftHolder}
            rightClass={styles.rightHolder}
            
            rightChildren={
                <div className={styles.scrollBar}>

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <h2>Preferences</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <p>Open to Work?</p>
                                    <span className={styles.inputRadio}>
                                        <label htmlFor="opentowork">Yes</label>
                                        <input type="radio" name="opentowork" id="Yes" value="Yes" />
                                        <label htmlFor="opentowork">No</label>
                                        <input type="radio" name="opentowork" id="No" value="No" />
                                    </span>
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="salaryclt">Intended Salary (CLT)</label>
                                    <input type="number" name="salaryclt" id="salaryclt" disabled />
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <p>Work Model</p>
                                    <span className={styles.inputRadio}>
                                        <label htmlFor="workmodel">CLT</label>
                                        <input type="checkbox" name="workmodel" id="CLT" value="CLT" />
                                        <label htmlFor="workmodel">PJ</label>
                                        <input type="checkbox" name="workmodel" id="PJ" value="PJ" />
                                    </span>
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="salarypj">Intended Salary (PJ)</label>
                                    <input type="number" name="salarypj" id="salarypj" disabled />
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <h2>Experience</h2>
                            
                            <p>Insert your main tools (up to 4):</p>
                            <div id="mainToolsHolder">                                
                                <div className={styles.formLine}>
                                    <div className={[styles.formLine, styles.mainExperienceLine].join(" ")}>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="tools" id="tools" placeholder="Tool" />
                                        </span>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="experience" id="experience" placeholder="Experience" />
                                        </span>
                                    </div>
                                    <div className={styles.verticalBar}></div>
                                    <div className={[styles.formLine, styles.mainExperienceLine].join(" ")}>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="tools" id="tools" placeholder="Tool" />
                                        </span>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="experience" id="experience" placeholder="Experience" />
                                        </span>
                                    </div>
                                </div>
                                
                                <div className={styles.formLine}>
                                    <div className={[styles.formLine, styles.mainExperienceLine].join(" ")}>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="tools" id="tools" placeholder="Tool" />
                                        </span>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="experience" id="experience" placeholder="Experience" />
                                        </span>
                                    </div>
                                    <div className={styles.verticalBar}></div>
                                    <div className={[styles.formLine, styles.mainExperienceLine].join(" ")}>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="tools" id="tools" placeholder="Tool" />
                                        </span>
                                        <span className={styles.inputSpan}>
                                            <input type="text" name="experience" id="experience" placeholder="Experience" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                                

                            <div className={styles.formLine}>
                                <div className={[styles.toolsArea, styles.inputSpanEntireLine].join(" ")} id="toolsArea">
                                    <div className={styles.singleTool}>
                                        <span>Teste</span>
                                        <span className={styles.deleteButton}>x</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formLine}>
                                <span className={[styles.inputSpan, styles.inputSpanEntireLine].join(" ")}>
                                    <label htmlFor="newToolName">Add complementary tools: </label>
                                    <span style={{display:"flex", flexDirection: "row", alignItems: "center"}}>
                                        <input type="text" name="newToolName" id="newToolName" placeholder='Tool name'/>
                                        <button className={styles.addButton} type="button" id="addToolButton">+</button>
                                    </span>
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup} id="experiencesHolder">
                            <h2>History</h2>
                        </div>
                        <button className={styles.addButton} type="button" id="addExperienceButton">+</button>

                        <span>
                            <button className={styles.submitFormButton} type="submit" id="submitButton">Save</button>
                        </span>
                    </form>
                    
                </div>
            }
        />
                
                
        </>
    )
}