import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInput, IonList, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('intask', { static: false }) myInput!: IonInput;
  @ViewChild('lisliding', { static: false }) mySliding!: IonList;

  public isContentLoaded: boolean = false;

  public tasks: string[] = new Array();
  public task: string = "";

  constructor(private toastController: ToastController, 
    private alertController: AlertController,
    private taskService:TaskService) {
      this.tasks = this.taskService.getTasks();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: color
    });
    await toast.present();
  }

  async presentAlert(pos: number) {
    const alert = await this.alertController.create({
      header: 'Seguro que desea completar la tarea '+this.tasks[pos],
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            this.presentToast("Se canceló la acción", "red");
            this.myInput.setFocus();
            this.mySliding.closeSlidingItems();
          },
        },
        {
          text: 'SI',
          role: 'confirm',
          handler: () => {
            this.completeTask(pos);
            this.myInput.setFocus();
            this.mySliding.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  getColor(type: string): string {
    let color = "";
    switch (type) {
      case "Abarrotes":
        color = "primary";
        break;
      case "Limpieza":
        color = "success";
        break;
      case "Mascotas":
        color = "warning";
        break;
      default:
        break;
    }
    return color;
  }

  public completeTask(pos: number) {
    this.tasks = this.taskService.completeTask(pos);
    this.presentToast("Tarea compleda", "green");
  }

  public newTask() {
    if (this.task) {
      this.tasks = this.taskService.newTask(this.task);
      console.log(this.tasks);
      this.task = "";
      this.presentToast("Tarea añadida con éxito", "green");
    } else {
      this.presentToast("La tarea no puede estar vacía", "red")
    }
    this.myInput.setFocus();

  }

  public validateTask() {
    return this.task ? "false" : "true";
  }

  ionViewDidEnter() {
    this.isContentLoaded = true;
  }

}