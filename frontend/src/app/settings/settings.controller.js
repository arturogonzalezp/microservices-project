import app from './../app';
import Dom7 from 'dom7';
import Auth from './../services/auth';
const $$ = Dom7;

function SettingsController(e, page) {
  const auth = new Auth(app);
  const currentUser = auth.getUser();

  const userText = $$('.user-name');
  console.log(userText.text(`${userText.text()} ${currentUser.name}`));

  $$('.open-edit-account').on('click', () => {
    const accountEditDialog = app.dialog.create({
      el: $$('.account-edit-dialog'),
      on: {
        opened: () => {
          console.log('Open');
        },
      },
    });

    accountEditDialog.open();

    $$('.save-edit-account').on('click', () => {
      console.log('Saved account details');
      accountEditDialog.close();
    });

    $$('.cancel-edit-account').on('click', () => {
      console.log('Cancel edit account');
      accountEditDialog.close();
    });
  });

  $$('.open-confirm-delete').on('click', () => {
    app.dialog.confirm(
      'Are you sure?',
      'Delete account',
      () => {
        deleteAccount();
      },
      () => {
        console.log('Cancel deletting account...');
      },
    );
  });
}

function deleteAccount() {
  const auth = new Auth();
  auth
    .deleteAccount()
    .then(response => {
      app.dialog.alert(
        'Your account has been deleted.',
        'Deleted account',
        () => {
          app.views.main.router.navigate('/login/');
        },
      );
    })
    .catch(error => {
      app.dialog.alert(error, 'Failed to delete account');
    })
    .finally(() => {});
}

export default SettingsController;
