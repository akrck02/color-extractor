import { Config } from "../../config/Config.js";
import { HTML } from "../../lib/gtdf/components/Dom.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf as BubbleUI } from "../../lib/others/BubbleUI.js";
import { ColorExtractor, StructuralColorPalette } from "../../lib/others/ColorExtractor.js";

@Route([undefined, "home", ""])
@Singleton()
export default class HomeView extends ViewUI {

    private static readonly ID = "home";

    private actionButton: UIComponent;
    private colorPicker: UIComponent;
    private colorPalette: StructuralColorPalette;

    public constructor(){
        super({
            type: HTML.VIEW,
            id: HomeView.ID,
            classes: [BubbleUI.BOX_COLUMN, BubbleUI.BOX_CENTER],
        });

    }

    public show(params: string[], container: UIComponent) {
            
        this.clean();
        const title = new UIComponent({
            type: HTML.H5,
            classes: [BubbleUI.TEXT_CENTER],
            text: `<span style="opacity:.8">Select a color on edit button to adapt</span> the application theme`,
            styles: {
                lineHeight: "1.5"
            }
        });
        title.appendTo(this);    

        const downloadButton = new UIComponent({
            type: HTML.BUTTON,
            text: "Download",
            classes: [BubbleUI.BOX_CENTER],
            styles: {
                margin: "10px 0"
            }
        });

        downloadButton.setEvents({
            click: (e: Event) => {
               
                // download the current color palette as a json file
                const a = document.createElement('a');
                const file = new Blob([JSON.stringify(this.colorPalette,null,4)], {type: 'application/json'});
                a.href = URL.createObjectURL(file);
                a.download = 'color-palette.json';
                a.click();
                URL.revokeObjectURL(a.href);

            }
        });


        const icon = new UIComponent({
            type: HTML.SPAN,
            classes: ["material-symbols-outlined"],
            text: "download",
            styles: {
                marginLeft: ".5rem"
            }
        });

        icon.appendTo(downloadButton);
        downloadButton.appendTo(this);



        this.createColorPicker().appendTo(this);

        for (let i = 0; i < 5; i++) {
            this.createUserPost().appendTo(this);
        }
     
        this.actionButton = this.createActionButton();
        this.actionButton.appendTo(this);
        this.createNavBar().appendTo(this);
        this.changeTheme("#0a0a0a");

        this.appendTo(container);
    }

    private createColorPicker() : UIComponent {

        const colorPickerContainer = new UIComponent({
            classes: [BubbleUI.BOX_ROW,BubbleUI.BOX_CENTER],
        });
        this.colorPicker = new UIComponent({
            type: HTML.INPUT,
            id: "color-picker",
            attributes: {
                type: "color",
            },
            styles: {
                display: "none"
            }
        });

        this.colorPicker.appendTo(colorPickerContainer);
        this.colorPicker.setEvents({
            input: (e: Event) => {
                const value = this.colorPicker.getValue();
                this.changeTheme(value);
            }
        });

        return colorPickerContainer;
    }

    /**
     * Changes the theme of the app based on the color selected
     * @param value The color selected
     */
    private changeTheme(value) {
        
        //this.actionButton.element.style.background = value;
        this.colorPalette = ColorExtractor.extractColors(value);

        document.body.style.setProperty("--background-color", this.colorPalette.background);
        document.body.style.setProperty("--on-background-color", this.colorPalette.onBackground);

        document.body.style.setProperty("--primary-container-color", this.colorPalette.surface1);
        document.body.style.setProperty("--on-primary-container-color", this.colorPalette.onSurface1);
    
        document.body.style.setProperty("--secondary-container-color", this.colorPalette.surface2);
        document.body.style.setProperty("--on-secondary-container-color", this.colorPalette.onSurface2);
    
        document.body.style.setProperty("--tertiary-container-color", this.colorPalette.surface3);
        document.body.style.setProperty("--on-tertiary-container-color", this.colorPalette.onSurface3);
    
        document.body.style.setProperty("--item-background-color", this.colorPalette.surface2);
        document.body.style.setProperty("--on-item-background-color", this.colorPalette.onSurface2);  
        
        
        console.table(this.colorPalette);
        

    }

    /**
     * Creates a fake user post
     * @returns The user post
     */
    private createUserPost() : UIComponent {

        const card = new UIComponent({
            classes: ["card",BubbleUI.PRIMARY_CONTAINER,BubbleUI.BOX_COLUMN],
        });
        
        const postHeader = new UIComponent({
            classes: [BubbleUI.BOX_ROW,BubbleUI.BOX_Y_CENTER,BubbleUI.BOX_X_BETWEEN],
        });

        postHeader.appendTo(card);

        const userData = new UIComponent({
            classes: ["user", BubbleUI.BOX_ROW,BubbleUI.BOX_Y_CENTER],
        });

        userData.appendTo(postHeader);

        const userPic = new UIComponent({
            type: HTML.IMG,
            classes: ["user-profile-pic"],
            attributes: {
                src: Config.Path.images + "akrck02.jpg",
                alt: "akrck02"
            }
        });

        userPic.appendTo(userData);

        const msgInfo = new UIComponent({
            classes: ["msg-info",BubbleUI.BOX_COLUMN],
        });

        msgInfo.appendTo(userData);
        

        const username = new UIComponent({
            type: HTML.P,
            classes: ["username"],
            text: "Akrck02"
        });
        username.appendTo(msgInfo);
       
        const date = new UIComponent({
            type: HTML.P,
            classes: ["date"],
            text: "4 min ago"
        });
        date.appendTo(msgInfo);
      
        const moreVert = new UIComponent({
            type: HTML.SPAN,
            classes: ["material-symbols-outlined"],
            text: "more_vert"
        });
        moreVert.appendTo(postHeader);

        const messageTo = new UIComponent({
            type: HTML.P,
            classes: ["message-to"],
            text: "To Juan Diaz"
        });
        messageTo.appendTo(card);

        const content = new UIComponent({
            classes: ["content"],
            text: `This is a random test, just ignore it.<br>
            Chekout my Github for other useless projects 🤓<br><br>
            I really hope you enjoy this theme generator.<br>
            checkout <a href="https://github.com/akrck02/Bubble-UI" style="opacity:.5">BubbleUI</a> for more UI magic! 💫💫💫<br><br>
            Miau miau miau miau miau miau miau miau miau miau miau<br>
            miau miau miau miau miau miau miau 🐈<br><br>`
        });
        content.appendTo(card);

        const buttonBar = new UIComponent({
            classes: ["button-bar"],
        });
        buttonBar.appendTo(card);

        const buttonBarButtons = new UIComponent({
            classes: [BubbleUI.BOX_ROW,BubbleUI.BOX_X_CENTER],
        });
        buttonBarButtons.appendTo(buttonBar);

        const discardButton = new UIComponent({
            type: HTML.BUTTON,
            text: "Discard"
        });
        discardButton.appendTo(buttonBarButtons);

        const replyButton = new UIComponent({
            type: HTML.BUTTON,
            text: "Reply"
        });
        replyButton.appendTo(buttonBarButtons);  

        return card;

    }
    
    /**
     * Creates the fake action button
     * @returns The action button
     */
    private createActionButton() : UIComponent {
        const actionButton = new UIComponent({
            type: HTML.BUTTON,
            classes: ["new-mail"],
        });

        actionButton.setEvents({
            click: (e: Event) => {
                this.colorPicker.element.click();
            }
        });

        const icon = new UIComponent({
            type: HTML.SPAN,
            classes: ["material-symbols-outlined"],
            text: "edit"
        });

        icon.appendTo(actionButton);
        return actionButton;
    }

    /*
    * Creates the fake navigation bar
    * @returns The navigation bar
    */
    private createNavBar() : UIComponent {

        const navBar = new UIComponent({
            classes: ["nav-bar",BubbleUI.BOX_ROW,BubbleUI.BOX_CENTER,BubbleUI.SECONDARY_CONTAINER]
        });
        
        this.createNavBarButton("all_inbox","inbox").appendTo(navBar);
        this.createNavBarButton("group","groups").appendTo(navBar);
        this.createSeparator().appendTo(navBar);
        this.createNavBarButton("chat","chat").appendTo(navBar);
        this.createNavBarButton("account_circle","account").appendTo(navBar);

        return navBar;

    }

    /**
     * Creates a fake navigation bar button
     * @param icon The icon to display
     * @param label The label to display
     * @returns The navigation bar button
     */
    private createNavBarButton(icon: string, label: string) : UIComponent {

        const buttonGroup = new UIComponent({
            classes: ["button-group",BubbleUI.BOX_COLUMN],
        });

        const button = new UIComponent({
            type: HTML.BUTTON,
            id: "inbox",
        });

        button.appendTo(buttonGroup);

        const iconComponent = new UIComponent({
            type: HTML.SPAN,
            classes: ["material-symbols-outlined"],
            text: icon
        });

        iconComponent.appendTo(button);

        const labelComponent = new UIComponent({
            type: HTML.LABEL,
            attributes: {
                for: "inbox"
            },
            text: label
        });

        labelComponent.appendTo(buttonGroup);

        return buttonGroup;
    }

    /**
     * Creates a fake blank space 
     * @returns The blank space
     */
    private createSeparator() : UIComponent {
        return new UIComponent({
            classes: ["separator"],
        });
    }
}