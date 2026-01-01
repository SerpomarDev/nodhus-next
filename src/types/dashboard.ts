export interface Role {
    id: number;
    nombre: string;
    menu_item: string;   // Ej: "1,2,3"
    menu_subitem: string; // Ej: "5,8,9"
}

export interface MenuItem {
    id: number;
    id_propio: number;
    id_subitem: number;
    nombre: string;      // Nombre del Grupo (Ej: "Operaciones")
    descripcion: string; // Nombre del Link (Ej: "Crear Ticket")
    ruta: string;
    icono_mi: string;    // HTML del icono legacy
    icono_msi: string;
}

export interface UserProfile {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
    email: string;
    cargo: string;
}