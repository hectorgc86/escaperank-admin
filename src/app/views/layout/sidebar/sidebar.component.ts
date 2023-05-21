import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import MetisMenu from "metismenujs";

import { MENU } from "./menu";
import { MENUUSER } from "./menuUser";
import { MENUVISITOR } from "./menuVisitor";

import { MenuItem } from "./menu.model";
import { Router, NavigationEnd } from "@angular/router";
import { ImageUtils } from "src/app/utils/image-utils";
import { Usuario } from "src/app/usuarios/interfaces/usuario.interface";
import { AuthService } from "src/app/auth/services/auth.service";
import { MENUADMIN } from "./menuAdmin";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild("sidebarToggler") sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild("sidebarMenu") sidebarMenu: ElementRef;

  usuario: Usuario;
  foldedMenu: boolean;
  visitor: boolean;
  imageUtils = ImageUtils;
  refreshed: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    router: Router,
    public authService: AuthService
  ) {
    this.refreshed = false;
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();
        /**
         * closing the sidebar
         */
        if (window.matchMedia("(max-width: 991px)").matches) {
          this.document.body.classList.remove("sidebar-open");
        }
      }
    });
  }
  ngOnInit(): void {
    this.visitor = false;
    if (localStorage.getItem("rol") == "SUPERADMIN") {
      this.menuItems = MENUADMIN;
    } else if (localStorage.getItem("rol") == "GAMEMASTER") {
      this.menuItems = MENU;
    } else if (localStorage.getItem("rol") == "USER") {
      this.menuItems = MENUUSER;
    } else {
      this.menuItems = MENUVISITOR;
      this.visitor = true;
    }
    this.foldedMenu = false;

    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
  }

  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle("active");
    this.sidebarToggler.nativeElement.classList.toggle("not-active");

    if (window.matchMedia("(min-width: 992px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-folded");
    } else if (window.matchMedia("(max-width: 991px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-open");
    }

    if (this.document.body.classList.contains("sidebar-folded")) {
      this.foldedMenu = true;
    } else {
      this.foldedMenu = false;
    }
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.foldedMenu = false;
      this.document.body.classList.add("open-sidebar-folded");
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.foldedMenu = true;
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add("sidebar-folded");
    } else {
      this.document.body.classList.remove("sidebar-folded");
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    if (item.link !== undefined && item.link.includes("/usuarios/:id")) {
      item.link = item.link.replace(":id", this.usuario.id !== undefined ? String(this.usuario.id) : "");
    }
    return item.subItems !== undefined && item.subItems.length > 0;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName("nav-link-ref");

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove("mm-active");
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove("mm-active");
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove("mm-show");
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove("mm-active");

          if (parent3El.classList.contains("side-nav-item")) {
            const firstAnchor = parent3El.querySelector(".side-nav-link-a-ref");

            if (firstAnchor) {
              firstAnchor.classList.remove("mm-active");
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove("mm-show");

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove("mm-active");
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links: any = document.getElementsByClassName("nav-link-ref");

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]["pathname"]) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add("mm-active");
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add("mm-active");

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add("mm-show");
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add("mm-active");

          if (parent3El.classList.contains("side-nav-item")) {
            const firstAnchor = parent3El.querySelector(".side-nav-link-a-ref");

            if (firstAnchor) {
              firstAnchor.classList.add("mm-active");
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add("mm-show");

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add("mm-active");
            }
          }
        }
      }
    }
  }

  logout() {
    this.authService.logout();
    location.assign("auth/login");
  }
  registro() {
    location.assign("auth/registro");
  }
}
