import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import type { ComponentProps, FC, ReactElement } from "react";

import { Button, Input, Modal } from "@/components/ui";
import type { ButtonProps, InputProps } from "@/components/ui";

import { createUser, updateUser, deleteUser, getUserById } from "@/api/users";

import type { User, CreateUserRequest, UpdateUserRequest } from "@/types/user";

export function UserComponent() {
  const [user, setUser] = useState<User | null>(null);

  return <div>User Component</div>;
}
