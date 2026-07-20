
CREATE POLICY "first user can self-promote admin" ON public.user_roles
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND role = 'admin'
    AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
  );
