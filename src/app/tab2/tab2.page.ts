import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasks: string[] = new Array();
  public task: string = "";

  constructor(private TaskService: TaskService,
    private toastController: ToastController,
    private alertController: AlertController) {
    this.tasks = this.TaskService.getCompletedTasks();
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
      header: 'Seguro que desea quitar de completados la tarea?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            this.presentToast("Se canceló la acción", "red");
            //this.mySliding.closeSlidingItems();
          },
        },
        {
          text: 'SI',
          role: 'confirm',
          handler: () => {
            this.TaskService.uncompleteTask(this.tasks[pos],pos)
            //this.mySliding.closeSlidingItems();
          },
        },
      ],
    });
  
    await alert.present();
  }

}
